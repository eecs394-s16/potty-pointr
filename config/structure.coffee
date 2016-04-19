# Read more about app structure at http://docs.appgyver.com

module.exports =

  rootView:
     location: "example#index"

  preloads: [
    {
      id: "detail"
      location: "example#detail"
    }
  ]

  drawers:
    left:
      id: "leftDrawer"
      location: "example#drawer"
      showOnAppLoad: false
     options:
      animation: "swingingDoor"
