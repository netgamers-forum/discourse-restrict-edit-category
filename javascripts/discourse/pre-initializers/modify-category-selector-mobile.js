import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "modify-category-selector-desktop",
  before: "inject-discourse-objects",

  initializeWithApi(api){
    api.modifyClass("component:composer-title", {
      pluginId: "PreventCategoryChangeComposerFirst",
      didInsertElement: function () {
        let categoryInput = document.getElementsByClassName("category-input")[0];
        if (categoryInput) {
          categoryInput.remove();
        }
      },
    });
  },

  initialize() {
    withPluginApi("1.6.0", this.initializeWithApi);
  },
};