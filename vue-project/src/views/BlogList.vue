<template>
  <div class="blog-detail-page">
    <div class="filters">
      <!-- Filter component or options can be added here -->
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
    <div v-if="filteredBlogs.length === 0" class="not-found">
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

const blogsPerPage = 5
const allBlogs = ref(getAllBlogs())

// Filters
const tagFilter = ref('')
const publishedDateFilter = ref('')

// Unique tags for autocomplete
const uniqueTags = computed(() => {
  const tags = new Set()
  allBlogs.value.forEach(blog => {
    blog.tags?.forEach(tag => tags.add(tag.name))
  })
  return Array.from(tags)
})

// Filtered blogs
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

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<style scoped>
body {
  background: #e5ded8;
  box-sizing: border-box;
}

.blog-detail-page {
  padding: 2rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.blog-container {
  background: #fff;
  border-radius: 5px;
  box-shadow: hsla(0, 0, 0, .2) 0 4px 2px -2px;
  font-family: "adelle-sans", sans-serif;
  font-weight: 100;
  margin: 48px auto;
  width: 20rem;
  @media screen and (min-width: 480px) {
    width: 28rem;
  }
  @media screen and (min-width: 767px) {
    width: 40rem;
  }
  @media screen and (min-width: 959px) {
    width: 50rem;
  }
}
.blog-container a {
  color: #4d4dff;
  text-decoration: none;
  transition: .25s ease;
  &:hover {
    border-color: #ff4d4d;
    color: #ff4d4d;
  }
}

.blog-cover {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/yosemite-3.jpg");
  background-size: cover;
  border-radius: 5px 5px 0 0;
  height: 15rem;
  box-shadow: inset hsla(0, 0, 0, .2) 0 64px 64px 16px;
}
.blog-author,
.blog-author--no-cover {
  margin: 0 auto;
  padding-top: .125rem;
  width: 80%;
}
.blog-author h3::before,
.blog-author--no-cover h3::before {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/russ.jpeg");
  background-size: cover;
  border-radius: 50%;
  content: " ";
  display: inline-block;
  height: 32px;
  margin-right: .5rem;
  position: relative;
  top: 8px;
  width: 32px;
}
.blog-author h3 {
  color: #fff;
  font-weight: 100;
}
.blog-author--no-cover h3 {
  color: lighten(#333, 40%);
  font-weight: 100;
}

.blog-body {
  margin: 0 auto;
  width: 80%;
}
.video-body {
  height: 100%;
  width: 100%;
}
.blog-title h1 a {
  color: #333;
  font-weight: 100;
}
.blog-summary p {
  color: lighten(#333, 10%);
}
.blog-tags ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
}
.blog-tags li + li {
  margin-left: .5rem;
}
.blog-tags a {
  border: 1px solid lighten(#333, 40%);
  border-radius: 3px;
  color: lighten(#333, 40%);
  font-size: .75rem;
  height: 1.5rem;
  line-height: 1.5rem;
  letter-spacing: 1px;
  padding: 0 .5rem;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 5rem;
}


.blog-footer {
  border-top: 1px solid lighten(#333, 70%);
  margin: 0 auto;
  padding-bottom: .125rem;
  width: 80%;
}
.blog-footer ul {
  list-style: none;
  display: flex;
  flex: row wrap;
  justify-content: flex-end;
  padding-left: 0;
}
.blog-footer li:first-child {
  margin-right: auto;
}
.blog-footer li + li {
  margin-left: .5rem;
}
.blog-footer li {
  color: lighten(#333, 40%);
  font-size: .75rem;
  height: 1.5rem;
  letter-spacing: 1px;
  line-height: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  white-space: nowrap;
  & a {
    color: lighten(#333, 40%);
  }
}
.comments {
  margin-right: 1rem;
}
.published-date {
  border: 1px solid lighten(#333, 40%);
  border-radius: 3px;
  padding: 0 .5rem;
}
.numero {
  position: relative;
  top: -0.5rem;
}

.icon-star,
.icon-bubble {
  fill: lighten(#333, 40%);
  height:24px;
  margin-right: .5rem;
  transition: .25s ease;
  width: 24px;
  &:hover {
    fill: #ff4d4d;
  }
}


.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
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
