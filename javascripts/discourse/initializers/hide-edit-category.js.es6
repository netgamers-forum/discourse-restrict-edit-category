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

            // TODO: act on the interface by hiding the category selector unless the canModifyTopicCategory is true
        });
    }
};