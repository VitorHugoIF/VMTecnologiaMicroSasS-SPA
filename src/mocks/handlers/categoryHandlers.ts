import { http, HttpResponse } from 'msw'

let categories: { id: string; name: string; description: string; isActive: boolean }[] = [
  { id: '1', name: 'Category A', description: 'Descrição da Category A', isActive: true },
  { id: '2', name: 'Category B', description: 'Descrição da Category B', isActive: false },
]

export const categoryHandlers = [
  http.get('/api/stock/category', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10)
    const search = url.searchParams.get('search')?.toLowerCase() || ''
    let filtered = categories
    if (search) {
      filtered = categories.filter(c => c.name.toLowerCase().includes(search) || c.description.toLowerCase().includes(search))
    }
    const totalCount = filtered.length
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const items = filtered.slice(start, end)
    return HttpResponse.json({
      success: true,
      data: {
        items,
        totalCount,
        page,
        pageSize,
      },
      errors: [],
      message: '',
    })
  }),
  http.get('/api/stock/category/:id', ({ params }) => {
    const category = categories.find((c) => c.id === params.id)
    if (!category) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(category)
  }),
  http.post('/api/stock/category', async ({ request }) => {
    const data = await request.json()
    if (typeof data !== 'object' || data === null) return new HttpResponse(null, { status: 400 })
    const newCategory = { id: String(Date.now()), name: String(data.name || ''), description: String(data.description || ''), isActive: true }
    categories.push(newCategory)
    return HttpResponse.json(newCategory)
  }),
  http.put('/api/stock/category/:id', async ({ params, request }) => {
    const data = await request.json()
    if (typeof data !== 'object' || data === null) return new HttpResponse(null, { status: 400 })
    categories = categories.map((c) => (c.id === params.id ? { ...c, ...data } : c))
    const updated = categories.find((c) => c.id === params.id)
    return HttpResponse.json(updated)
  }),
  http.patch('/api/stock/category/:id/enable', ({ params }) => {
    categories = categories.map((c) => c.id === params.id ? { ...c, isActive: true } : c)
    const updated = categories.find((c) => c.id === params.id)
    return HttpResponse.json(updated)
  }),
  http.patch('/api/stock/category/:id/disable', ({ params }) => {
    categories = categories.map((c) => c.id === params.id ? { ...c, isActive: false } : c)
    const updated = categories.find((c) => c.id === params.id)
    return HttpResponse.json(updated)
  }),
] 