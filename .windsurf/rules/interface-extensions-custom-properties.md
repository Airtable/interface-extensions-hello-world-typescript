---
description: Airtable Interface Extensions - custom properties (v0.3.0, 2025-10-20)
trigger: always_on
---

<custom_properties>

- Custom properties allow Airtable builders to configure properties of the Interface Extension on
  each Interface page it is used on
- ALWAYS use custom properties to define required fields from the underlying Airtable data. DO NOT
  hard-code field names/ids into the source code. Make sure to provide a reasonable `defaultValue`.
  Also make sure to provide a `shouldFieldBeAllowed` function that returns a boolean indicating whether the field should be allowed.
- To define custom properties:
    1. Import the `useCustomProperties` hook from `@airtable/blocks/interface/ui`.
    2. Define your properties in a function. This function receives the current `base` and returns
       an array of `BlockPageElementCustomProperty` objects.
        ```
        type BlockPageElementCustomProperty = {key: string; label: string} & (
            | {type: 'boolean'; defaultValue: boolean}
            | {type: 'string'; defaultValue?: string}
            | {
                type: 'enum';
                possibleValues: Array<{value: string; label: string}>;
                defaultValue?: string;
                }
            | {
                type: 'field';
                table: Table;
                shouldFieldBeAllowed?: (field: {id: FieldId; config: FieldConfig}) => boolean; // If not provided, all fields in the table will be shown in the dropdown.
                defaultValue?: Field;
                }
            | {
                type: 'table';
                defaultValue?: Table;
                }
            );
        ```
    3. Important: wrap the function in `useCallback` or define it outside of the component. This
       ensures a stable identity, which is important for memoization and for subscribing to schema
       changes correctly.
    4. Call `useCustomProperties` with your function. It returns an object with:
        - `customPropertyValueByKey`: a mapping of each property's key to its current value.
        - `errorState`: if present, contains an error from trying to set up custom properties.
- Custom properties should be used to define values that are required for the Interface Extension to
  work at all
- Custom properties should be used to define required fields from the underlying Airtable data, to
  avoid hard-coding field names into the code of the Interface Extension
    - Make it easier for builders configuring the custom properties by filtering to only show fields
      with the relevant type (e.g. single select fields, number fields). To do this, within your
      function that is passed to `useCustomProperties`, access the current table using
      `base.getTableById(tableId)` or custom properties and filter the table's fields by field type
      using the `FieldType` enum. Pass the filtered fields into the `possibleValues` array parameter
      of the custom property
    - If the prompt includes specific named fields, check that if these fields exist in the current
      table by comparing to the `name` property of the values in the `table.fields` array. If any of
      the named fields do exist, pass their `Field` objects into the `defaultValue` parameter of the
      custom property
- ONLY show instructions to configure custom properties in the Interface Extension's UI when those
  custom properties do not have values set for the current page
- Here is an example of how to use custom properties to avoid hard-coding fields:

```
import {useCustomProperties} from '@airtable/blocks/interface/ui';
import {FieldType} from '@airtable/blocks/interface/models';

function getCustomProperties(base: Base) {
    // For single-table extensions, you can use base.tables[0] in the custom properties setup function
    const table = base.tables[0];
    const isNumberField = (field: {id: FieldId, config: FieldConfig}) => field.config.type === FieldType.NUMBER;
    const numberFields = table.fields.filter(isNumberField);
    const defaultXAxis = numberFields[0];
    const defaultYAxis = numberFields[1];
    return [
        {
            key: 'title',
            label: 'Title',
            type: 'string',
            defaultValue: 'Chart',
        },
        {
            key: 'xAxis',
            label: 'X-axis',
            type: 'field',
            table,
            shouldFieldBeAllowed: isNumberField,
            defaultValue: defaultXAxis,
        },
        {
            key: 'yAxis',
            label: 'Y-axis',
            type: 'field',
            table,
            shouldFieldBeAllowed: isNumberField,
            defaultValue: defaultYAxis,
        },
        {
            key: 'color',
            label: 'Color',
            type: 'enum',
            possibleValues: [
                {value: 'red', label: 'Red'},
                {value: 'blue', label: 'Blue'},
                {value: 'green', label: 'Green'},
            ],
            defaultValue: 'red',
        },
        {
            key: 'showLegend',
            label: 'Show Legend',
            type: 'boolean',
            defaultValue: true,
        },
    ];
}

function MyApp() {
    const {customPropertyValueByKey, errorState} = useCustomProperties(getCustomProperties);
}
```

- Here is an example of how to use table custom properties for multi-table Custom Elements:

```
import {useCustomProperties} from '@airtable/blocks/interface/ui';
import {FieldType} from '@airtable/blocks/interface/models';

function getCustomProperties(base: Base) {
    return [
        {
            key: 'projectsTable',
            label: 'Projects Table',
            type: 'table',
            defaultValue: base.tables.find((table) => table.name.toLowerCase().includes('projects')),
        },
        {
            key: 'tasksTable',
            label: 'Tasks Table',
            type: 'table',
            defaultValue: base.tables.find((table) => table.name.toLowerCase().includes('tasks')),
        },
    ];
}

function MyApp() {
    const {customPropertyValueByKey, errorState} = useCustomProperties(getCustomProperties);
    const projectsTable = customPropertyValueByKey.projectsTable as Table;
    const tasksTable = customPropertyValueByKey.tasksTable as Table;
}
```

- Here is an example of how to use custom properties to avoid hard-coding credentials:

```
import {useCustomProperties} from '@airtable/blocks/interface/ui';

function getCustomProperties(base: Base) {
    return [
        {
            key: 'apiKey',
            label: 'API Key',
            type: 'string',
            defaultValue: '',
        },
    ];
}

function MyApp() {
    const {customPropertyValueByKey, errorState} = useCustomProperties(getCustomProperties);
}
```

- If any custom properties are not set for the current page, render instructions to configure them
  via the "properties panel" of the Interface Extension </custom_properties>
