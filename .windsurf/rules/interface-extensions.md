---
description: Airtable Interface Extensions development (v0.1.0, 2025-05-28)
trigger: always_on
---
You are developing an Interface Extension which extends Airtable's built-in Interfaces with custom UI to serve a specific need or use case.

<blocks_sdk>
* Import Airtable Blocks SDK hooks and functions (like `initializeBlock`, `useBase`, `useRecords`, `useCustomProperties` and `expandRecord`) from '@airtable/blocks/interface/ui' NOT '@airtable/blocks/ui'
* Import the FieldType enum from '@airtable/blocks/interface/models' NOT '@airtable/blocks/models'
* Don't import any Airtable Blocks UI elements like `Box` as these are not supported in Interface Extensions
* The entrypoint for an Interface Extension is `frontend/index.tsx` and you should focus your editing there (or on components that are then imported there)
* The `frontend/index.tsx` file should conclude with an `initializeBlock` call that looks like: `initializeBlock({ interface: () => <MyComponent /> });` where `MyComponent` is the name of the root component to be rendered
* To retrieve information about the current user, import the `useSession` hook which returns the current session. `session.currentUser` will provide attributes about the user: `email`, `id`, `name` and `profilePicUrl` (optional).
</blocks_sdk>

<reading_airtable_data>
* Interface Extensions can only access one table of Airtable data. That table's data is available by:
    1. Importing `useBase` and `useRecords` hooks
    2. Calling `const base = useBase(); const table = base.tables[0]; const records = useRecords(table);`
* DO NOT use `base.getTableByName(string)` as it is not supported in Interface Extensions
* DO NOT attempt to access records from other tables, as this is not supported in Interface Extensions
* Airtable records returned by `useRecords(table)` may change without warning at any time, whether because records were created, edited or deleted, the user's permissions were updated, or filters applied to the records by the Interface page changed.
</reading_airtable_data>

<editing_airtable_data>
* Editing, adding or deleting Airtable records is not (yet) supported in Interface Extensions. DO NOT attempt to guess API methods that allow this functionality.
</editing_airtable_data>

<credentials_for_third_party_integrations>
* Interface Extensions can be used to integrate with third-party systems (e.g. sources of data or tools) that require credentials (like API keys, usernames or passwords) to authenticate with
* ALWAYS use <custom_properties> to allow builders to configure credentials rather than storing them in the code of your Interface Extension
    * Inform the user that you have used custom properties to store any credentials when responding to the prompt
</credentials_for_third_party_integrations>

<record_detail_pages>
* Airtable Interfaces provide Record Detail pages, which allow users to see much more detail about a specific record, edit data, run Automations relating to that record and more. You can open Record Detail pages from an Interface Extension by importing the `expandRecord` function and calling `expandRecord(record)` to open a Record Detail page - passing the complete `Record` object - typically from a click event
* Opening Record Detail pages directly is your preferred approach to show more detail about a specific record rather than using popovers or custom detail panes, unless specifically instructed
</record_detail_pages>

<third_party_libraries>
* Unless specifically instructed to use a different library, prefer the following npm packages for different tasks (and import the libraries however their documentation recommends):
    * react-vega: for rendering charts and data visualizations
    * @google/model-viewer: for rendering 3D models
    * mapbox-gl: for rendering maps specifically when instructed to use Mapbox
    * marked: for parsing Markdown
* Make sure to install third-party libraries first (don't depend on that being done for you)
* Read third-party library documentation thoroughly and carefully to understand best practices to make use of its functionality. Look up multiple examples to make sure you understand correct usage of all API methods and return types. DO NOT invent or create API methods in third-party libraries
</third_party_libraries>

<dimensions>
* Make sure the Extension uses the entire width and height of its container by default and is not limited by the width or height of its content. If the content needs to scroll horizontally or vertically, it will be able to.
* Add an inline style that sets both the html tag and the first div within the body tag to have width: 100% and height: 100%
</dimensions>