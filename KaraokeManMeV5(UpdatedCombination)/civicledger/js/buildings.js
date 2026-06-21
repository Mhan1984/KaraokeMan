
// =====================  ito yung sa Buildings.js ko ===
// Simulation Data Engine
// =====================
const buildingData = {
    daan: [
        { name: "2-Lane Dirt Road", icon: "🛣️", cost: 100, labor: 2, days: 1, unlocked: true, size: "1x1", spec: "Temporary closures apply." },
        { name: "2-Lane Concrete", icon: "🛣️", cost: 300, labor: 4, days: 2, unlocked: false, size: "1x1", spec: "Upgrade: Less Traffic" },
        { name: "4-Lane Dirt Road", icon: "🛣️", cost: 500, labor: 6, days: 3, unlocked: false, size: "2x2", spec: "Wide raw path" },
        { name: "4-Lane Concrete", icon: "🛣️", cost: 1000, labor: 10, days: 5, unlocked: false, size: "2x2", spec: "Avenue: Max Flow" }
    ],
    bahay: [
        { name: "Simple House", icon: "🏠", cost: 200, labor: 1, days: 1, unlocked: true, size: "1x1", spec: "Needs: Food, Water" },
        { name: "Modern House", icon: "🏡", cost: 600, labor: 3, days: 2, unlocked: false, size: "2x2", spec: "Dream house status" },
        { name: "Grand Mansion", icon: "🏰", cost: 1500, labor: 5, days: 4, unlocked: false, size: "3x3", spec: "High Happiness" },
        { name: "Apartment Block", icon: "🏢", cost: 3000, labor: 12, days: 6, unlocked: false, size: "3x3", spec: "Capacity: 50 citizens" },
        { name: "5-Floor Building", icon: "🏢", cost: 6000, labor: 20, days: 10, unlocked: false, size: "3x3", spec: "Mid-rise living" },
        { name: "10-Floor Building", icon: "🏢", cost: 12000, labor: 35, days: 15, unlocked: false, size: "4x4", spec: "High-density zone" },
        { name: "15-Floor Skyscraper", icon: "🏙️", cost: 25000, labor: 60, days: 22, unlocked: false, size: "4x4", spec: "Ultimate Living" }
    ],
    service: [
        { name: "Municipal Hall", icon: "🏛️", cost: 2000, labor: 5, days: 4, unlocked: true, size: "3x3", spec: "Track: Jobless & Pop" },
        { name: "City Eco Park", icon: "🌳", cost: 500, labor: 2, days: 1, unlocked: true, size: "2x2", spec: "Entertainment & Leisure" },
        { name: "Police Station", icon: "👮", cost: 1500, labor: 8, days: 3, unlocked: true, size: "2x2", spec: "Monitors: Crime Rate" },
        { name: "Fire Station", icon: "🚒", cost: 1200, labor: 6, days: 3, unlocked: true, size: "2x2", spec: "Monitors: Fire Hazards" },
        { name: "General Hospital", icon: "🏥", cost: 4000, labor: 15, days: 7, unlocked: true, size: "4x4", spec: "Monitors: Public Sickness" },
        { name: "Waste Disposal", icon: "🗑️", cost: 800, labor: 4, days: 2, unlocked: true, size: "2x2", spec: "Keeps city clean" }
    ],
    store: [
        { name: "Small Corner Shop", icon: "🏪", cost: 300, labor: 2, days: 1, unlocked: true, size: "1x1", spec: "Tax Revenue: Low" },
        { name: "Supermarket", icon: "🛒", cost: 1500, labor: 8, days: 3, unlocked: false, size: "3x3", spec: "Provides stable food" },
        { name: "Commercial Mall", icon: "🛍️", cost: 8000, labor: 25, days: 7, unlocked: false, size: "5x5", spec: "Max Entertainment" }
    ],
    factory: [
        { name: "Community Garden", icon: "🌱", cost: 150, labor: 1, days: 1, unlocked: true, size: "2x2", spec: "Produces: Raw Crops" },
        { name: "Food Factory", icon: "🍞", cost: 1200, labor: 10, days: 3, unlocked: false, size: "3x3", spec: "Wage: 20/hr. Shifts apply" },
        { name: "Beverage Plant", icon: "🍷", cost: 2000, labor: 14, days: 4, unlocked: false, size: "3x3", spec: "Requires fruit items" },
        { name: "Appliance Assembly", icon: "🔌", cost: 5000, labor: 30, days: 6, unlocked: false, size: "4x4", spec: "Manufacturing Sector" },
        { name: "Tech Factory", icon: "💻", cost: 15000, labor: 50, days: 10, unlocked: false, size: "4x4", spec: "High-Tech Products" }
    ],
    office: [
        { name: "Small Agency", icon: "📁", cost: 800, labor: 4, days: 2, unlocked: true, size: "2x2", spec: "White-collar starts" },
        { name: "Medium Business", icon: "💼", cost: 2500, labor: 12, days: 4, unlocked: false, size: "3x3", spec: "Corporate tax tier" },
        { name: "Large Corporation", icon: "🏢", cost: 7000, labor: 30, days: 7, unlocked: false, size: "4x4", spec: "High wage, strict breaks" },
        { name: "Tech Hub Station", icon: "🚀", cost: 18000, labor: 55, days: 12, unlocked: false, size: "4x4", spec: "Ultimate office upgrade" }
    ]
};