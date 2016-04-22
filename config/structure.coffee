# Read more about app structure at http://docs.appgyver.com

module.exports =

  # tabs: [
  #   {
  #     title: "Index"
  #     id: "index"
  #     location: "example#index"
  #   },
  #   {
  #     title: "Detailed View"
  #     id: "detail"
  #     location: "example#detail"
  #   }
  # ]

  rootView:
     location: "example#index"

  drawers:
    left:
      id: "leftDrawer"
      location: "example#drawer"
      showOnAppLoad: false
     options:
      animation: "swingingDoor"
