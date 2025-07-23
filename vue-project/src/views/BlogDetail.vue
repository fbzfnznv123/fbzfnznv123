<template>
  <div class="blog-detail-page">
    <div class="filters">
      <input
        v-model="tagFilter"
        type="text"
        placeholder="ค้นหาแท็ก เช่น vue"
        list="tagSuggestions"
      />
      <datalist id="tagSuggestions">
        <option v-for="tag in uniqueTags" :key="tag" :value="tag" />
      </datalist>

      <input
        v-model="publishedDateFilter"
        type="date"
        placeholder="ค้นหาตามวันที่"
      />
    </div>

    <div class="blog-grid">
      <div v-for="(blog, index) in paginatedBlogs" :key="index" class="blog-container">
        <div class="blog-header">
          <div
            class="blog-cover"
            :style="{
              backgroundImage: blog.coverImage ? 'url(' + blog.coverImage + ')' : 'none',
            }"
          >
            <div v-if="blog.coverImage" class="blog-author">
              <h3>{{ blog.author }}</h3>
            </div>
            <div v-else class="blog-author--no-cover">
              <h3>{{ blog.author }}</h3>
            </div>
          </div>
        </div>

        <div class="blog-body">
          <div class="blog-title">
            <h1><a :href="blog.url">{{ blog.title }}</a></h1>
          </div>
          <div v-if="blog.summary" class="blog-summary" v-html="blog.summary"></div>
          <div class="blog-tags">
            <ul>
              <li v-for="(tag, i) in blog.tags" :key="i">
                <a :href="tag.url || '#'">{{ tag.name }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="blog-footer">
          <ul>
            <li class="published-date">{{ blog.publishedDate }}</li>
            <li class="comments">
              <a href="#">
                <svg class="icon-bubble"><use xlink:href="#icon-bubble" /></svg>
                <span class="numero">{{ blog.comments }}</span>
              </a>
            </li>
            <li class="shares">
              <a href="#">
                <svg class="icon-star"><use xlink:href="#icon-star" /></svg>
                <span class="numero">{{ blog.shares }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="paginatedBlogs.length === 0" class="not-found">
      <p>ไม่พบข้อมูล Blog ตามเงื่อนไขที่เลือก</p>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAllBlogs } from '../data/blogData'

// จำนวน blog ต่อหน้า
const blogsPerPage = 5

// ดึงข้อมูล blog ทั้งหมด
const allBlogs = ref(getAllBlogs())

// ตัวกรองแท็กและวันที่
const tagFilter = ref('')
const publishedDateFilter = ref('')

// สร้างชุดแท็กที่ไม่ซ้ำสำหรับ autocomplete
const uniqueTags = computed(() => {
  const tagsSet = new Set()
  allBlogs.value.forEach(blog => {
    blog.tags?.forEach(tag => tagsSet.add(tag.name))
  })
  return Array.from(tagsSet)
})

// กรอง blog ตามเงื่อนไข tag และวันที่
const filteredBlogs = computed(() => {
  return allBlogs.value.filter(blog => {
    const tagMatch = tagFilter.value
      ? blog.tags?.some(tag =>
          tag.name.toLowerCase().includes(tagFilter.value.toLowerCase())
        )
      : true

    const dateMatch = publishedDateFilter.value
      ? blog.publishedDate?.startsWith(publishedDateFilter.value)
      : true

    return tagMatch && dateMatch
  })
})

// Pagination
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredBlogs.value.length / blogsPerPage)))

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * blogsPerPage
  return filteredBlogs.value.slice(start, start + blogsPerPage)
})

// ฟังก์ชันเปลี่ยนหน้า
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

// เมื่อ filter เปลี่ยน ให้รีเซ็ตหน้าเป็น 1
watch([tagFilter, publishedDateFilter], () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* ใส่ CSS ตามที่คุณมี หรือปรับตามต้องการ */
.blog-detail-page {
  padding: 2rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.blog-container {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  font-family: "adelle-sans", sans-serif;
}

.blog-cover {
  background-size: cover;
  border-radius: 5px 5px 0 0;
  height: 15rem;
  position: relative;
}

.blog-author h3 {
  color: #fff;
  font-weight: 100;
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0,0,0,0.5);
  padding: 4px 8px;
  border-radius: 4px;
}

.blog-author--no-cover h3 {
  color: #333;
  padding: 4px 0;
}

.blog-title h1 a {
  color: #333;
  font-weight: 600;
  text-decoration: none;
}

.blog-summary {
  margin-top: 1rem;
  color: #555;
  font-size: 0.9rem;
}

.blog-tags ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;
}

.blog-tags li {
  margin-right: 0.5rem;
}

.blog-tags a {
  background-color: #e0e7ff;
  color: #3730a3;
  border-radius: 8px;
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
  text-decoration: none;
}

.blog-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #888;
}

.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.pagination button {
  background-color: #4d4dff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background-color: #ff4d4d;
}

.pagination span {
  font-weight: 600;
  color: #333;
}
</style>
