import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "restrict-edit-category",
  initialize(container) {
    withPluginApi("1.6.0", (api) => {
      const currentUser = api.getCurrentUser();
      api.onPageChange((url, title) => {
        const topic = container.lookup("controller:topic")
        console.log(topic)
        // console.log(topic.currentUser)
        const model = topic.get("model");
        console.log(model.get("details"));
      })
      
      let canModifyTopicCategory;

      if (currentUser) {
        canModifyTopicCategory =
          currentUser.trust_level >= settings.restrict_to_trust_level ||
          currentUser.staff;
      }

      if (!canModifyTopicCategory) {
        // Prevent editing from Topic Title Edit
        api.modifyClass("controller:topic", {
          pluginId: "RestrictCategoryChangeTopic",
          showCategoryChooser: false,
        });
        // Prevent editing category from Edit First Post (courtesy of @Canapin)
        api.modifyClass("component:composer-title", {
          pluginId: "PreventCategoryChangeComposerFirst",
          didInsertElement: function () {
            let categoryInput = document.getElementsByClassName("category-input")[0];
            if (categoryInput) {
              categoryInput.remove();
            }
          },
        });
      }
    });
  },
};
