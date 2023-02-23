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

            // Prevent editing category from Edit Title
            api.modifyClass("component:topic-category", {
                pluginId: "RestrictCategoryChange",
                didInsertElement: function() {
                    if(!canModifyTopicCategory) {
                        // Hide category selection in Edit Title mode
                        if (document.getElementsByClassName('edit-topic-title')[0] != null){
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
                }
            });

            // Prevent editing category from Edit First Post (courtesy of @Canapin)
            api.modifyClass("component:composer-title", {
                pluginId: "RestrictCategoryChange",
                didInsertElement: function() {
                    if(!canModifyTopicCategory) {
                        // Hide category only in Editing mode
                        if (document.getElementsByClassName('composer-action-edit')[0] != null){
                            let FirstPostCategoryInput = document.getElementsByClassName('category-input')[0];
                            let FirstPostTagChoser = document.getElementsByClassName('mini-tag-chooser')[0];
                            if(FirstPostCategoryInput != null) {
                                FirstPostCategoryInput.remove();
                                if(FirstPostTagChoser != null) {
                                    FirstPostTagChoser.style.marginLeft = '0';
                                }
                            }
                        }
                    }
                }
            });
        });
    }
};