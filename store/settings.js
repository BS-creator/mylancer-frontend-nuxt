export const state = () => ({
  pageTitle: "MyLancer",
  siteTitle: "MyLancer",
  showFooter: true,
});

export const getters = {
  getSiteTitle: (state) => {
    return state.siteTitle
  },
  getShowFooter: (state) => {
    return state.showFooter
  },
}
