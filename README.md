# Hide Category when Editing

This component is meant to hide the option to change category when editing a topic

## Features

- Hide the select interface when editing unless being member of the `staff` group

## Future Iteration

- Select which groups have access to the change category in editing mode, with staff always included
- Option to also add hide the tag change for groups not allowed

## Source / Credits

We used this plugins as guideline to help us understand how to create ours

- https://github.com/tshenry/discourse-restrict-uploads
- https://github.com/discourse/discourse/blob/main/app/assets/javascripts/discourse/app/lib/plugin-api.js
