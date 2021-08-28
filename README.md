# Usage
If you want to use a predefined tabletop setting/system, you can choose from a list of predefined settings.
If there is no setting that suits your needs, then you can create your own setting (see Custom Setting section).  
Please consider submitting your setting via GitHub Issues.

If you want to use a predefined theme, you can choose from a list of predefined themes.
If there is no topic that suits your needs, then you can create your own topic (see Custom Setting section).  
Please consider submitting your theme via GitHub Issues.


# Custom

## Custom Setting
To add a custom setting you need to define it as a JSON (`.json`) file.
Below is the base for a setting, which you will need to customize to your liking.
The arrays define the _keys_.

```json
{
    "attributes": [...],    // list of strings
    "others": [...]         // list of strings
}
```

## Custom theme
To add a custom theme you have to define it as a stylesheet (`.css`) file.
Below is the basis for a stylesheet, which you need to customize to your liking (for an overview of the structure of the html file, you can examine the export in the browser with the browser's internal developer tools).

```css
#export {}
#export .export-head {}
#export .export-head .export-name {}
#export .export-body {}
#export .export-body .export-image {}
#export .export-body .export-description {}
#export .export-attributes {}
#export .export-attributes .attribute-container {}
#export .export-attributes .attribute-container .attribute-key {}
#export .export-attributes .attribute-container .attribute-value {}
#export .export-others {}
#export .export-others .export-other-container {}
#export .export-others .other-key {}
#export .export-others .other-value {}
```
