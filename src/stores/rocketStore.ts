import { defineStore } from 'pinia'

interface Rocket {
    id: string
    name: string
    description: string
    image: string
    costPerLaunch: number
    country: string
    firstFlight: string
}

export const useRocketStore = defineStore('rocket', {
    state: () => ({
        rockets: [] as Rocket[],
        loading: false,
        isLoading: false,
        searchQuery: '' as string,
    }),
    getters: {
        filteredRockets(state) {
            if (!state.searchQuery) return state.rockets
            return state.rockets.filter((rocket) =>
                rocket.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
        },
    },
    actions: {
        async fetchRockets() {
            this.loading = true
            try {
                const res = await fetch('https://api.spacexdata.com/v4/rockets')
                const data = await res.json()
                this.rockets = data.map((r: any) => ({
                    id: r.id,
                    name: r.name,
                    description: r.description,
                    image: r.flickr_images[0] || '',
                    costPerLaunch: r.cost_per_launch,
                    country: r.country,
                    firstFlight: r.first_flight,
                }))
            } catch (err) {
                console.error('Failed to fetch rockets:', err)
            } finally {
                this.loading = false
            }
        },

        getRocketById(id: string) {
            return this.rockets.find((rocket) => rocket.id === id)
        },
        async addRocket(newRocket: Rocket) {
            this.isLoading = true
            try {
                await fetch('/my-api', { method: 'POST', body: JSON.stringify(newRocket) })
                this.rockets.unshift(newRocket)
            } finally {
                this.isLoading = false
            }
        }
    },
})
