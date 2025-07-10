import { http, HttpResponse } from 'msw'

let brands: { id: string; name: string; description: string; isActive: boolean }[] = [
  { id: '1', name: 'Brand A', description: 'Descrição da Brand A', isActive: true },
  { id: '2', name: 'Brand B', description: 'Descrição da Brand B', isActive: false },
]

export const brandHandlers = [
  http.get('/api/stock/brand', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10)
    const search = url.searchParams.get('search')?.toLowerCase() || ''
    let filtered = brands
    if (search) {
      filtered = brands.filter(b => b.name.toLowerCase().includes(search) || b.description.toLowerCase().includes(search))
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
  http.get('/api/stock/brand/:id', ({ params }) => {
    const brand = brands.find((b) => b.id === params.id)
    if (!brand) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(brand)
  }),
  http.post('/api/stock/brand', async ({ request }) => {
    const data = await request.json()
    if (typeof data !== 'object' || data === null) return new HttpResponse(null, { status: 400 })
    const newBrand = { id: String(Date.now()), name: String(data.name || ''), description: String(data.description || ''), isActive: true }
    brands.push(newBrand)
    return HttpResponse.json(newBrand)
  }),
  http.put('/api/stock/brand/:id', async ({ params, request }) => {
    const data = await request.json()
    if (typeof data !== 'object' || data === null) return new HttpResponse(null, { status: 400 })
    brands = brands.map((b) => (b.id === params.id ? { ...b, ...data } : b))
    const updated = brands.find((b) => b.id === params.id)
    return HttpResponse.json(updated)
  }),
  http.patch('/api/stock/brand/:id/enable', ({ params }) => {
    brands = brands.map((b) => b.id === params.id ? { ...b, isActive: true } : b)
    const updated = brands.find((b) => b.id === params.id)
    return HttpResponse.json(updated)
  }),
  http.patch('/api/stock/brand/:id/disable', ({ params }) => {
    brands = brands.map((b) => b.id === params.id ? { ...b, isActive: false } : b)
    const updated = brands.find((b) => b.id === params.id)
    return HttpResponse.json(updated)
  }),
] 