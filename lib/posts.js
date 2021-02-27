import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const getAllPosts = (dir, allPosts) => {
    allPosts = allPosts || [];
    const fileNames = fs.readdirSync(dir);
    fileNames.forEach((file) => {
      if (fs.statSync(`${dir}/${file}`).isDirectory()) {
        return getAllPosts(`${dir}/${file}`, allPosts);
      } else {
        // Remove ".md" from file name to get id
        const id = file.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(dir, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        const year = dir.substr(dir.indexOf("posts") + 6);
        // Combine the data with the id
        return allPosts.push({
          id,
          year,
          ...matterResult.data,
        });
      }
    });
    return allPosts;
  };

  const allPosts = getAllPosts(postsDirectory);
  // Sort posts by date
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const getAllPostNames = (dir, allPosts) => {
    allPosts = allPosts || [];
    const fileNames = fs.readdirSync(dir);
    fileNames.forEach((file) => {
      if (fs.statSync(`${dir}/${file}`).isDirectory()) {
        return getAllPostNames(`${dir}/${file}`, allPosts);
      } else {
        return allPosts.push({
          name: file,
          year: dir.substr(dir.indexOf("posts") + 6),
        });
      }
    });
    return allPosts;
  };

  const allPosts = getAllPostNames(postsDirectory);
  return allPosts.map((post) => {
    return {
      params: {
        id: post.name.replace(/\.md$/, ""),
        year: post.year,
      },
    };
  });
}

export async function getPostData(year, id) {
  const fullPath = path.join(postsDirectory, year, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
