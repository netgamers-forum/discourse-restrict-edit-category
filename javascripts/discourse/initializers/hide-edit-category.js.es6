import { withPluginApi } from "discourse/lib/plugin-api";
import { authorizesOneOrMoreExtensions } from "discourse/lib/uploads";
import discourseComputed from "discourse-common/utils/decorators";

export default {
    name: "restrict-edit-category",
    initialize() {
        withPluginApi("0.8", api => {
            let currentUser = api.getCurrentUser();
            let canModifyTopicCategory;

            if (currentUser) {
                canModifyTopicCategory =
                    currentUser.trust_level >= settings.restrict_to_trust_level ||
                    currentUser.staff;
            }

            // Prevent editing category from Edit First Post (courtesy of @Canapin)
            api.modifyClass("component:composer-title", {
                pluginId: "RestrictCategoryChange",
                didInsertElement: function() {
                    if(!canModifyTopicCategory) {
                        // Hide category selection in First Reply Editing mode
                        let FirstPostCategoryInput = document.getElementsByClassName('category-input')[0];
                        let FirstPostTagChoser = document.getElementsByClassName('mini-tag-chooser')[0];
                        if(FirstPostCategoryInput != null) {
                            FirstPostCategoryInput.remove();
                            if(FirstPostTagChoser != null) {
                                FirstPostTagChoser.style.marginLeft = '0';
                            }
                        }
                        // Hide category selection in Edit Title mode
                        let TitleCategoryInput = document.getElementsByClassName('category-chooser')[0];
                        let TitleTagChoser = document.getElementsByClassName('mini-tag-chooser')[0];
                        if(TitleCategoryInput != null) {
                            TitleCategoryInput.remove();
                            if(TitleTagChoser != null) {
                                TitleTagChoser.style.marginLeft = '0';
                            }
                        }
                    }
                }
            });

        });
    }
};