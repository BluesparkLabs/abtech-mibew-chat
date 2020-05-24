# A-B Tech Mibew Chat theme

These custom chat widget styles for Mibew matche the 2020 A-B Tech website
redesign. The styles are loosly based on the default Mibew chat widget styles
with the following changes and additions:

![Chat widget screenshot render][screenshot]

## Installation

1. Assumes Mibew 3.2.6 has already been installed and configured.
2. Create a directory "abtech" inside `mibew/styles/chats/`.
3. Download the latest [zipfile] from master branch on Github.
4. Unzip the contents into `mibew/styles/chats/abtech/`.
5. In the web browser visit the Chat theme preview page at:
    `/mibew/operator/style/chat/preview`  and select "abtech" from the
    dropdown to confirm it is properly installed.
6. The "Select a style for your chat windows" dropdown should be set to
    `abtech` on the settings page here: `/mibew/operator/settings`
7. The "Company logo" field on the settings page should be __left blank__
    because the default works as intended.
8. Proceed to download and install the [A-B Tech Mibow Invitations theme].

## Changes from the default mibew chat widget styles

### Gulpfile overhaul

For some unknown reason the mibew themes depend on the gulpfile.js provided
by Mibew core source code. Unfortunately the versions are fairly outddated,
so I opted to package a custom gulpfile.js with this project, allowing us
to add more dependencies.

* Upgraded gulpfile to version 4.
* Ported the relevant gulpfile.js tasks from upstream Mibew version 3.2.6.
* Note: the `gulp-handlebars` and npm `handlebars` engine are locked, at
   version 4.0.x to avoid rendering errors from Mibew version 3.2.6
* Added SCSS and POSTCSS support to gulpfile.

### Theme changes:

* Removed old ie (6/7) support.
* Overhaul several handlebars templates to match theming DOM and CSS needs.
* Removed all GIF and PNG background images that supported the "shadowed"
   styles. This theme is more of a flat look and feel.
* Removed "buttons.gif" icon sprite and replaced it with Bootstrap Icons. Icons
   are copied from the `node_modules/bootstrap-icons` folder into `icons/` to
   make them accessible to the stylesheet without committing npm dependencies.
* Replaced several PNGs with new SVGs (eg, default-logo.svg).
* Added custom favicon.ico from the A-B Tech 2020 site redesign.
* Added screenshot of the admin ui.
* Ensure both Iframe and PopUp methods are themed and work correctly.


[screenshot]: https://github.com/BluesparkLabs/abtech-mibew-chat/blob/master/screenshots/client_chat.png?raw=true
[zipfile]: https://github.com/BluesparkLabs/abtech-mibew-chat/archive/master.zip
[A-B Tech Mibew Invitations theme]: https://github.com/BluesparkLabs/abtech-mibew-invitations
