import axios from 'axios';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

interface Node {
  title: string,
  path: string,
  order: number,
  related: {
    content: string
  }
  items: Node[]
}

const preprocess = (article: Node, toplevel: boolean) => {
  const yaml = `---\ntitle: ${toplevel ? '简介' : article.title}\nsidebar_position: ${toplevel ? -1 : article.order}\n---\n`;
  let body = article.related.content;
  body = body.replaceAll(/^(#+)/gm, '#$1');
  return `${yaml}\n${body}`;
}

const visit = (root: string, node: Node, toplevel=false) => {
  if (toplevel || node.items.length) {
    mkdirSync(join(root, node.path), { recursive: true });
    writeFileSync(join(root, node.path, 'index.mdx'), preprocess(node, toplevel));
    for (const child of node.items) {
      visit(root, child);
    }
  } else {
    writeFileSync(join(root, `${node.path}.mdx`), preprocess(node, toplevel));
  }
}

const downloader = (index: number) => {
  return async (root: string) => {
    const { data } = await axios.get(`/navigation/render/${index}`, {
      baseURL: 'https://api.viva-la-vita.org/api',
      headers: { "Accept-Encoding": "gzip" },
      params: {
        type: 'TREE'
      }
    }) as { data: Node[] };
    data.map(x => visit(root, x, true));
  }
}

export const downloadWiki = downloader(1), downloadMeta = downloader(2);
export default downloader;
