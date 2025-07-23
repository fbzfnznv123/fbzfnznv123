import { ref } from "vue"

export const blogs = ref([])
export const topics = ref([])

const allBlogData = [
  {
    author: "Russ Beye",
    coverImage:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/yosemite-3.jpg",
    title: "I Like To Make Cool Things",
    url: "#",
    summary: `I love working on fresh designs that <a href="https://www.youtube.com/watch?v=hANtM1vJvOo">breathe</a>. To that end, I need to freshen up my portfolio here because it does exactly the opposite. For the next month I will be working almost exclusively on my portfolio. Sounds like a lot of fun!`,
    tags: [
      { name: "css", url: "#" },
      { name: "web design", url: "#" },
      { name: "codepen", url: "#" },
      { name: "twitter", url: "https://twitter.com/russbeye" },
    ],
    publishedDate: "23/07/2025 10:00",
    comments: 4,
    shares: 1,
  },
  {
    author: "Jane Doe",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Designing for the Future",
    url: "#",
    summary: `Exploring new trends in web design and how to stay ahead of the curve.`,
    tags: [
      { name: "design", url: "#" },
      { name: "future", url: "#" },
      { name: "trends", url: "#" },
    ],
    publishedDate: "22/07/2025 15:30",
    comments: 2,
    shares: 3,
  },
  {
    author: "Alex Smith",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    title: "Vue.js Best Practices",
    url: "#",
    summary: `A collection of tips and tricks for building scalable Vue.js applications.`,
    tags: [
      { name: "vue", url: "#" },
      { name: "javascript", url: "#" },
    ],
    publishedDate: "21/07/2025 09:15",
    comments: 5,
    shares: 2,
  },
  {
    author: "Alex Smith",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    title: "Vue.js Best Practices",
    url: "#",
    summary: `A collection of tips and tricks for building scalable Vue.js applications.`,
    tags: [
      { name: "vue", url: "#" },
      { name: "javascript", url: "#" },
    ],
    publishedDate: "21/07/2025 09:15",
    comments: 5,
    shares: 2,
  },
  {
    author: "Alex Smith",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    title: "Vue.js Best Practices",
    url: "#",
    summary: `A collection of tips and tricks for building scalable Vue.js applications.`,
    tags: [
      { name: "vue", url: "#" },
      { name: "javascript", url: "#" },
    ],
    publishedDate: "21/07/2025 09:15",
    comments: 5,
    shares: 2,
  },
  {
    author: "Alex Smith",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    title: "Vue.js Best Practices",
    url: "#",
    summary: `A collection of tips and tricks for building scalable Vue.js applications.`,
    tags: [
      { name: "vue", url: "#" },
      { name: "javascript", url: "#" },
    ],
    publishedDate: "21/07/2025 09:15",
    comments: 5,
    shares: 2,
  },
  {
    author: "Alex Smith",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    title: "Vue.js Best Practices",
    url: "#",
    summary: `A collection of tips and tricks for building scalable Vue.js applications.`,
    tags: [
      { name: "vue", url: "#" },
      { name: "javascript", url: "#" },
    ],
    publishedDate: "21/07/2025 09:15",
    comments: 5,
    shares: 2,
  },
  {
    author: "Alex Smith",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    title: "Vue.js Best Practices",
    url: "#",
    summary: `A collection of tips and tricks for building scalable Vue.js applications.`,
    tags: [
      { name: "vue", url: "#" },
      { name: "javascript", url: "#" },
    ],
    publishedDate: "21/07/2025 09:15",
    comments: 5,
    shares: 2,
  },
  {
    author: "Alex Smith",
    coverImage: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    title: "Vue.js Best Practices",
    url: "#",
    summary: `A collection of tips and tricks for building scalable Vue.js applications.`,
    tags: [
      { name: "vue", url: "#" },
      { name: "javascript", url: "#" },
    ],
    publishedDate: "21/07/2025 09:15",
    comments: 5,
    shares: 2,
  },
]


export function loadBlogData(page = 1, limit = 2) {
  const start = (page - 1) * limit
  const end = start + limit
  return allBlogData.slice(start, end)
}

export function getBlogPageCount(limit = 2) {
  return Math.ceil(allBlogData.length / limit)
}

export function getAllBlogs() {
  return allBlogData
}

export function getAllTopics() {
  const topicSet = new Set()

  allBlogData.forEach(blog => {
    blog.tags.forEach(tag => {
      topicSet.add(tag.name)
    })
  })

  return Array.from(topicSet)
}


