interface ISideBar {
    name:string,
    link:string
}


export const userSideBarRouteList:ISideBar[]=[
    {
        name:"Trainers",
        link: "/dashboard/"
    },
    {
        name:"BMIS",
        link: "/dashboard/bmi"
    },
]

export const adminSideBarRouteList:ISideBar[]=[
    {
        name:"Goals",
        link: "/dashboard"
    },
    {
        name:"Admin Profile",
        link: "/profile"
    },
]