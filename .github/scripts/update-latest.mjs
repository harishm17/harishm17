import fs from "node:fs/promises";

const OWNER = "harishm17";
const README_PATH = "README.md";

function truncate(s, max = 92) {
  const str = (s || "").trim().replace(/\s+/g, " ");
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + "…";
}

function formatDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(d);
}

async function graphql(query, variables) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN is required");
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub GraphQL error: ${res.status} ${res.statusText}: ${text}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`GitHub GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data;
}

async function main() {
  const query = `
    query ($login: String!) {
      user(login: $login) {
        repositories(
          first: 20
          orderBy: { field: PUSHED_AT, direction: DESC }
          privacy: PUBLIC
          affiliations: [OWNER]
          ownerAffiliations: [OWNER]
        ) {
          nodes {
            name
            url
            description
            pushedAt
            isFork
            isArchived
          }
        }
      }
    }
  `;

  const data = await graphql(query, { login: OWNER });
  const nodes = data?.user?.repositories?.nodes || [];

  const repos = nodes
    .filter((r) => r && !r.isFork && !r.isArchived)
    .filter((r) => r.name && r.url && r.pushedAt)
    .filter((r) => r.name.toLowerCase() !== OWNER.toLowerCase());

  const top = repos.slice(0, 5);

  let content = "";
  if (!top.length) {
    content = "- (no recent public updates found)";
  } else {
    content = top
      .map((r) => {
        const desc = truncate(r.description, 90);
        const date = formatDate(r.pushedAt);
        const suffixBits = [];
        if (desc) suffixBits.push(desc);
        if (date) suffixBits.push(`updated ${date}`);
        const suffix = suffixBits.length ? ` — ${suffixBits.join(" · ")}` : "";
        return `- [${r.name}](${r.url})${suffix}`;
      })
      .join("\n");
  }

  const readme = await fs.readFile(README_PATH, "utf8");
  const start = "<!--LATEST:start-->";
  const end = "<!--LATEST:end-->";
  const re = new RegExp(`${start}[\\s\\S]*?${end}`, "m");
  if (!re.test(readme)) {
    throw new Error("Markers not found in README.md");
  }

  const updated = readme.replace(re, `${start}\n${content}\n${end}`);
  await fs.writeFile(README_PATH, updated, "utf8");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

