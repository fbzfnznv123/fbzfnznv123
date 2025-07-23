<template>
  <div class="page-content">
    <div class="blog-wrapper">
      <!-- Left: Blog Card 3/4 -->
      <div class="blog-left">
        <div v-for="(blog, index) in blogs" :key="blog.id || index" class="blog-container">
          <div class="blog-header">
            <div
              class="blog-cover"
              :style="{
                backgroundImage: blog.coverImage
                  ? 'url(' + blog.coverImage + ')'
                  : 'none',
              }"
            >
              <div class="blog-author" v-if="blog.coverImage">
                <h3>{{ blog.author }}</h3>
              </div>
              <div class="blog-author--no-cover" v-else>
                <h3>{{ blog.author }}</h3>
              </div>
            </div>
          </div>

          <div class="blog-body">
            <div class="blog-title">
              <h1>
                <a :href="blog.url">{{ blog.title }}</a>
              </h1>
            </div>
            <div class="blog-summary" v-if="blog.summary">
              <p v-html="blog.summary"></p>
            </div>
            <div class="blog-tags">
              <ul>
                <li v-for="(tag, i) in blog.tags" :key="i">
                  <a :href="tag.url || '#'">{{ tag.name }}</a>
                </li>
              </ul>
            </div>
            <button class="read-btn" @click="openBlogDetail(blog)">Read</button>
          </div>

          <div class="blog-footer">
            <ul>
              <li class="published-date">{{ blog.publishedDate }}</li>
              <li class="comments">
                <a href="#">
                  <svg class="icon-bubble">
                    <use xlink:href="#icon-bubble" />
                  </svg>
                  <span class="numero">{{ blog.comments }}</span>
                </a>
              </li>
              <li class="shares">
                <a href="#">
                  <svg class="icon-star">
                    <use xlink:href="#icon-star" />
                  </svg>
                  <span class="numero">{{ blog.shares }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="blog-pagination">
          <button @click="prevPage" :disabled="page <= 1">Prev</button>
          <span class="page-info">Page {{ page }} / {{ pageCount }}</span>
          <button @click="nextPage" :disabled="page >= pageCount">Next</button>
        </div>
      </div>

      <!-- Right: Show up to 5 blogs from all blogs -->
      <div class="blog-right">
        <ol :style="`--length: ${blogsRight.length}`" role="list">
          <li v-for="(blog, i) in blogsRight" :key="blog.id || i" :style="`--i: ${i + 1}`">
            <h3>{{ blog.title }}</h3>
            <p v-if="blog.summary" v-html="blog.summary"></p>
            <p v-else>ไม่มีข้อมูลสรุป</p>
            <button class="read-btn" @click="openBlogDetail(blog)">Read</button>
          </li>
        </ol>
        <button class="see-all-btn" @click="goToBlogList">See all blog</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { loadBlogData, getBlogPageCount, getAllBlogs } from "../data/blogData";

const page = ref(1);
const limit = 2;
const pageCount = computed(() => getBlogPageCount(limit));
const router = useRouter();

const blogs = ref([]);

// Fix: Always assign an array, even if no data
function loadData(pageNum, limitNum) {
  const data = loadBlogData(pageNum, limitNum) || [];
  blogs.value = Array.isArray(data) ? data : [];
}

// Limit blog-right to 5 items from all blogs
const blogsRight = computed(() => getAllBlogs().slice(0, 5));

function goToPage(newPage) {
  if (newPage >= 1 && newPage <= pageCount.value) {
    page.value = newPage;
    loadData(page.value, limit);
  }
}

function prevPage() {
  goToPage(page.value - 1);
}

function nextPage() {
  goToPage(page.value + 1);
}

function goToBlogList() {
  router.push("/blog-list");
}

function openBlogDetail(blog) {
  if (blog.id) {
    router.push(`/blog/${blog.id}`);
  }
}

onMounted(() => {
 loadData(page.value, limit);
  console.log("blogs:", blogs.value);           // ต้องไม่ว่าง
  console.log("blogsRight:", blogsRight.value); // ต้องไม่ว่าง
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

button {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.blog-wrapper {
  display: flex;
  gap: 2rem;
  max-width: 1280px;
  margin: auto;
  align-items: flex-start;
  flex-wrap: wrap;
}

.blog-left {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-right {
  flex: 1;
  position: sticky;
  top: 2rem;
}

.blog-container {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.blog-container:hover {
  transform: translateY(-4px);
}

.blog-header {
  position: relative;
}

.blog-cover {
  background-size: cover;
  background-position: center;
  height: 220px;
  position: relative;
}

.blog-author,
.blog-author--no-cover {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.55);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(2px);
}

.blog-body {
  padding: 1.5rem;
}

.blog-title h1 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.blog-title h1 a {
  text-decoration: none;
  color: #1e1e1e;
}

.blog-title h1 a:hover {
  color: #4f46e5;
}

.blog-summary {
  margin-bottom: 1rem;
}

.blog-summary p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.6;
}

.blog-tags ul {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
}

.blog-tags li a {
  background: #f0f0f5;
  border-radius: 16px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #444;
  text-transform: uppercase;
  transition: background 0.2s;
}

.blog-tags li a:hover {
  background: #e0e7ff;
}

.blog-footer {
  border-top: 1px solid #eee;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #777;
}

.blog-footer ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.blog-footer li a {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #666;
  transition: color 0.2s;
}

.blog-footer li a:hover {
  color: #4f46e5;
}

.blog-footer li a:hover svg {
  fill: #4f46e5;
}

.blog-footer li a svg {
  width: 18px;
  height: 18px;
  fill: #999;
}

.blog-pagination {
  margin-top: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.page-info {
  font-weight: 600;
  color: #333;
}

/* ==== RIGHT SIDEBAR: Timeline Card ==== */
.blog-right ol {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.blog-right li {
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
  position: relative;
}

.blog-right li::before {
  content: counter(list);
  counter-increment: list;
  position: absolute;
  top: -12px;
  left: -12px;
  background: #4f46e5;
  color: #fff;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: bold;
  box-shadow: 0 0 0 4px #e0e7ff;
}

.blog-right h3 {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #333;
}

.blog-right p {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
}

.see-all-btn {
  margin-top: 1rem;
  width: 100%;
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.see-all-btn:hover {
  background-color: #3730a3;
}

.read-btn {
  margin-top: 1rem;
  padding: 0.4rem 1.2rem;
  border-radius: 6px;
  border: none;
  background: #4f46e5;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  display: inline-block;
}

.read-btn:hover {
  background: #3730a3;
}

/* ==== Responsive ==== */
@media (max-width: 768px) {
  .blog-wrapper {
    flex-direction: column;
  }

  .blog-left,
  .blog-right {
    flex: none;
    width: 100%;
  }

  .blog-right {
    position: static;
    margin-top: 2rem;
  }
}
</style>
