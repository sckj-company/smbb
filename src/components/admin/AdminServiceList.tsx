"use client"

import Link from "next/link"
import { Edit, Plus, Search } from "lucide-react"
import useSWR from "swr"
import { useState } from "react"

type Service = { id: string; name: string; description: string; image: string; slug: string }
const fetcher = (url: string) => fetch(url).then((response) => response.json())

export default function AdminServiceList() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: services = [], isLoading } = useSWR<Service[]>("/api/products?type=service", fetcher)
  const query = searchQuery.trim().toLocaleLowerCase()
  const visibleServices = services.filter((service) => `${service.name} ${service.description}`.toLocaleLowerCase().includes(query))

  return <main className="mx-auto max-w-7xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-medium uppercase tracking-[0.18em] text-blue-500">Administração</p><h1 className="mt-2 text-2xl font-semibold text-slate-900">Serviços</h1></div><div className="flex flex-wrap items-center gap-3"><label className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200"><Search className="h-4 w-4 text-slate-400" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Pesquisar serviço" aria-label="Pesquisar serviço" className="w-40 bg-transparent text-sm outline-none" /></label><Link href="/admin/services/new" className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white"><Plus className="h-4 w-4" />Adicionar serviço</Link></div></div>{isLoading ? <p className="text-sm text-slate-500">A carregar serviços...</p> : visibleServices.length === 0 ? <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">Nenhum serviço cadastrado.</p> : <div className="grid gap-5 md:grid-cols-3">{visibleServices.map((service) => <Link key={service.id} href={`/admin/services/${service.id}`} className="group rounded-lg border border-slate-200 bg-white p-2"><img src={service.image} alt={service.name} className="h-48 w-full rounded-sm object-cover" /><div className="flex items-start justify-between gap-3 px-3 py-4"><div><h2 className="font-semibold text-slate-800">{service.name}</h2><p className="mt-1 line-clamp-2 text-sm text-slate-500">{service.description}</p></div><Edit className="h-4 w-4 text-blue-500" /></div></Link>)}</div>}</main>
}
