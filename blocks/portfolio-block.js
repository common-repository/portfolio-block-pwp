(function (data, blocks, editor, components, element, i18n, serverSideRender, apiFetch) {
  // Load Components
  var __ = i18n.__
  var el = element.createElement
  var withSelect = data.withSelect
  var useSettings = wp.blockEditor.useSettings
  var ServerSideRender = serverSideRender
  var BlockControls = wp.blockEditor.BlockControls
  var BlockAlignmentMatrixControl = wp.blockEditor.__experimentalBlockAlignmentMatrixControl
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar
  var InspectorControls = wp.blockEditor.InspectorControls
  var PanelColorSettings = wp.blockEditor.PanelColorSettings
  var ColorPalette = wp.components.ColorPalette
  var PanelBody = components.PanelBody
  var Placeholder = components.Placeholder
  var ToggleControl = components.ToggleControl
  var SelectControl = components.SelectControl
  var TextControl = components.TextControl
  var RangeControl = components.RangeControl
  var CheckboxControl = components.CheckboxControl
  var BaseControl = components.BaseControl
  var UnitControl = components.__experimentalUnitControl
  var Spinner = components.Spinner
  var Button = components.Button
  var IconButton = components.IconButton

  // Dropdown Options
  var gradientOptions = [
    {
      name: 'Midnight Hour',
      gradient: 'linear-gradient(180deg, rgb(0, 5, 80), rgb(124, 0, 163) 100%)',
      slug: 'midnight-hour'
    },
    {
      name: 'California Dusk',
      gradient: 'linear-gradient(225deg, rgb(223, 212, 0), rgb(156, 0, 163) 100%)',
      slug: 'california-dusk'
    },
    {
      name: 'Subtle Teal',
      gradient: 'linear-gradient(135deg, rgb(0, 219, 255), rgb(0, 197, 93) 100%)',
      slug: 'subtle-teal'
    },
    {
      name: 'Tokyo Sunset',
      gradient: 'linear-gradient(135deg, rgb(255, 0, 116), rgb(0, 40, 205) 100%)',
      slug: 'tokyo-sunset'
    },
    {
      name: 'Fire Blaze',
      gradient: 'linear-gradient(135deg, rgb(244, 182, 0), rgb(200, 0, 0) 100%)',
      slug: 'fire-blaze'
    },
    {
      name: 'Lime Light',
      gradient: 'linear-gradient(320deg, rgb(151, 236, 5), rgb(251, 230, 0) 100%)',
      slug: 'lime-light'
    }
  ]
  var orderOptions = [
    { label: __('Ascending', 'portfolio-block-pwp'), value: 'ASC' },
    { label: __('Descending', 'portfolio-block-pwp'), value: 'DESC' }
  ]
  var layoutOptions = [
    { label: __('Content Overlay', 'portfolio-block-pwp'), value: 'position-overlay' },
    { label: __('Content Below Image', 'portfolio-block-pwp'), value: 'position-below-image' },
    { label: __('Content Above Image', 'portfolio-block-pwp'), value: 'position-above-image' }
  ]
  var headingOptions = [
    { label: __('Heading 1', 'portfolio-block-pwp'), value: 'h1' },
    { label: __('Heading 2', 'portfolio-block-pwp'), value: 'h2' },
    { label: __('Heading 3', 'portfolio-block-pwp'), value: 'h3' },
    { label: __('Heading 4', 'portfolio-block-pwp'), value: 'h4' },
    { label: __('Heading 5', 'portfolio-block-pwp'), value: 'h5' },
    { label: __('Heading 6', 'portfolio-block-pwp'), value: 'h6' }
  ]
  var unitTypes = [
    { value: 'px', label: 'px' },
    { value: 'em', label: 'em' },
    { value: 'rem', label: 'rem' }
  ]

  // Load WooCommerce categories.
  var wooCats = []
  var wooCall = apiFetch({ path: '/wc/v2/products/categories?per_page=100' }).then(cats => {
    var catsArr = []
    jQuery.each(cats, function (key, val) {
      catsArr.push({ name: val.name })
    })
    wooCats = catsArr
    return catsArr
  }).catch(err => {
    console.log(err.stack)
  })

  // Create custom Posts icon SVG.
  const portfolioIcon = el('svg',
    {
      class: 'pwp-portfolio-icon',
      width: 24,
      height: 24
    },
    el('path',
      {
        fill: '#000',
        d: 'M20 5c0-1.103-0.897-2-2-2 0-1.103-0.897-2-2-2h-8c-1.103 0-2 0.897-2 2-1.103 0-2 0.897-2 2-1.103 0-2 0.897-2 2v14c0 1.103 0.897 2 2 2h16c1.103 0 2-0.897 2-2v-14c0-1.103-0.897-2-2-2zM8 2h8c0.55 0 1 0.45 1 1h-10c0-0.55 0.45-1 1-1zM6 4h12c0.55 0 1 0.45 1 1h-14c0-0.55 0.45-1 1-1zM20 21h-16v-14h16v14c0.003 0 0 0 0 0z'
      }
    ),
    el('path',
      {
        fill: '#000',
        d: 'M17.5 9h-11c-0.275 0-0.5 0.225-0.5 0.5v9c0 0.275 0.225 0.5 0.5 0.5h11c0.275 0 0.5-0.225 0.5-0.5v-9c0-0.275-0.225-0.5-0.5-0.5zM7 10h10v5.169l-0.584-0.584c-0.781-0.778-2.050-0.778-2.828 0l-3.416 3.416h-3.172v-8zM11.584 18l2.709-2.709c0.387-0.387 1.025-0.387 1.416 0l1.291 1.291v1.419h-5.416z'
      }
    ),
    el('path',
      {
        fill: '#000',
        d: 'M11 12.5c0-0.828-0.672-1.5-1.5-1.5s-1.5 0.672-1.5 1.5c0 0.828 0.672 1.5 1.5 1.5s1.5-0.672 1.5-1.5zM9 12.5c0-0.275 0.225-0.5 0.5-0.5s0.5 0.225 0.5 0.5-0.225 0.5-0.5 0.5-0.5-0.225-0.5-0.5z'
      }
    )
  )

  const licenseActive = pwpPortfolioLicense.isValid; // Accessing the license status from the PHP file.

  // Define the upgrade link as a variable.
  const upgradeLink = el('a', {
    href: 'https://portfoliowp.com',
    target: '_blank',
    rel: 'noopener noreferrer'
  }, __('Upgrade', 'portfolio-block-pwp'));

  // Register Block.
  const pwpPortfolioBlock = blocks.registerBlockType('pwp/portfolio-block', {
    title: __('Portfolio', 'portfolio-block-pwp'),
    description: __('Display a group of posts as a portfolio', 'portfolio-block-pwp'),
    icon: portfolioIcon,
    category: 'pwp-blocks',
    // Define this property and there'll be a preview.
    example: {},
    supports: {
      align: true,
      alignWide: true,
      anchor: true,
      spacing: { // Requires add_theme_support('custom-spacing');
        margin: true, // Enable margin UI control.
        padding: true // Enable padding UI control.
      }
    },
    attributes: {
      editMode: {
        type: 'boolean',
        default: true
      },
      position: {
        type: 'string',
        default: 'center center'
      },
      textalignment: {
        type: 'string',
        default: 'center'
      },
      postcategory: {
        type: 'array'
      },
      posttype: {
        type: 'string'
      },
      posttaxonomy: {
        type: 'string'
      },
      postorder: {
        type: 'string',
        default: 'DESC'
      },
      randomize: {
        type: 'boolean',
        default: false
      },
      portlayout: {
        type: 'string',
        default: 'position-overlay'
      },
      portheading: {
        type: 'string',
        default: 'h4'
      },
      portheadingsize: {
        type: 'string',
        default: '24px'
      },
      portbodysize: {
        type: 'string',
        default: '16px'
      },
      portcatsize: {
        type: 'string',
        default: '14px'
      },
      porttitle: {
        type: 'boolean',
        default: true
      },
      portcat: {
        type: 'boolean',
        default: true
      },
      portexcerpt: {
        type: 'boolean',
        default: false
      },
      portbutton: {
        type: 'boolean',
        default: true
      },
      portlink: {
        type: 'boolean',
        default: true
      },
      portcontent: {
        type: 'boolean',
        default: false
      },
      portpagination: {
        type: 'boolean',
        default: false
      },
      masonrylayout: {
        type: 'boolean',
        default: false
      },
      filternav: {
        type: 'boolean',
        default: false
      },
      filtersearch: {
        type: 'boolean',
        default: false
      },
      portcolumns: {
        type: 'number',
        default: 2
      },
      maxposts: {
        type: 'string',
        default: '12'
      },
      offset: {
        type: 'string',
        default: ''
      },
      gutterwidth: {
        type: 'string',
        default: '24'
      },
      porttitlecolor: {
        type: 'string',
        default: '#fff'
      },
      porttextcolor: {
        type: 'string',
        default: '#fff'
      },
      porticoncolor: {
        type: 'string',
        default: '#fff'
      },
      portbgcolor: {
        type: 'string',
        default: '#fff'
      },
      buttoncolor: {
        type: 'string',
        default: '#000'
      },
      buttonbg: {
        type: 'string',
        default: ''
      },
      buttongradient: {
        type: 'string'
      },
      porthovercolor: {
        type: 'string',
        default: '#000'
      },
      porthoveropacity: {
        type: 'number',
        default: 0.5
      },
      styleradius: {
        type: 'number',
        default: 0
      },
      styleshadow: {
        type: 'number',
        default: 0
      },
      styleborderwidth: {
        type: 'number',
        default: 0
      },
      stylebordercolor: {
        type: 'string',
        default: '#ccc'
      },
      styleshadowcolor: {
        type: 'string',
        default: '#ccc'
      },
      stylepadhoriz: {
        type: 'number',
        default: 16
      },
      stylepadvert: {
        type: 'number',
        default: 16
      },
      portfolioid: {
        type: 'string',
        default: ''
      }
    },
    edit: withSelect(function (select, props) {
      // Load products & Categories based on Taxonomy and add to properties
      var taxonomy = props.attributes.posttaxonomy
      return {
        categories: select('core').getEntityRecords('taxonomy', taxonomy, { per_page: -1 }),
        types: select('core').getPostTypes({ per_page: -1 }),
        wooCats: wooCats
      }
    })(function (props) {
      // Load all attributes
      var postTypeBox = el(Spinner)
      var categoryBox = el(Spinner)
      var taxonomyBox = el(Spinner)
      var editMode = props.attributes.editMode
      var position = props.attributes.position
      var textalignment = props.attributes.textalignment
      var postcategory = props.attributes.postcategory
      var posttype = props.attributes.posttype
      var posttaxonomy = props.attributes.posttaxonomy
      var portlayout = props.attributes.portlayout
      var postorder = props.attributes.postorder
      var randomize = props.attributes.randomize
      var portheading = props.attributes.portheading
      var portheadingsize = props.attributes.portheadingsize
      var portbodysize = props.attributes.portbodysize
      var portcatsize = props.attributes.portcatsize
      var porttitle = props.attributes.porttitle
      var portcat = props.attributes.portcat
      var portexcerpt = props.attributes.portexcerpt
      var portbutton = props.attributes.portbutton
      var portlink = props.attributes.portlink
      var portcontent = props.attributes.portcontent
      var portpagination = props.attributes.portpagination
      var masonrylayout = props.attributes.masonrylayout
      var filternav = props.attributes.filternav
      var filtersearch = props.attributes.filtersearch
      var portcolumns = props.attributes.portcolumns
      var maxposts = props.attributes.maxposts
      var offset = props.attributes.offset
      var gutterwidth = props.attributes.gutterwidth
      var porttitlecolor = props.attributes.porttitlecolor
      var porttextcolor = props.attributes.porttextcolor
      var porticoncolor = props.attributes.porticoncolor
      var portbgcolor = props.attributes.portbgcolor
      var buttoncolor = props.attributes.buttoncolor
      var buttonbg = props.attributes.buttonbg
      var buttongradient = props.attributes.buttongradient
      var porthovercolor = props.attributes.porthovercolor
      var porthoveropacity = props.attributes.porthoveropacity
      var styleradius = props.attributes.styleradius
      var styleshadow = props.attributes.styleshadow
      var styleborderwidth = props.attributes.styleborderwidth
      var stylebordercolor = props.attributes.stylebordercolor
      var styleshadowcolor = props.attributes.styleshadowcolor
      var stylepadhoriz = props.attributes.stylepadhoriz
      var stylepadvert = props.attributes.stylepadvert
      var portfolioid = props.attributes.portfolioid
      var postCategories = []
      var taxonomies = []
      var postTaxonomies = []

      // Load post types in dropdown if they exist (only if viewable and support editor feature)
      if (props.types) {
        var postSelections = [{ label: __('Choose Post Type', 'portfolio-block-pwp'), value: '' }]
        jQuery.each(props.types, function (key, val) {
          if (val.viewable && val.supports.editor) {
            // Remove Pages
            if (val.slug === 'page') {
              return
            }
            postSelections.push({ label: val.name, value: val.slug })
            if (posttype && posttype === val.slug) {
              taxonomies = val.taxonomies
            }
          }
        })

        postTypeBox = el(SelectControl, {
          className: 'pwp-dropdown',
          label: __('Select a Post Type', 'portfolio-block-pwp'),
          value: posttype,
          options: postSelections,
          __nextHasNoMarginBottom: true,
          onChange: function (val) { props.setAttributes({ posttype: val, posttaxonomy: '' }) }
        })
      }

      // Load taxonomy dropdown if they exist
      if (taxonomies.length > 0) {
        postTaxonomies = [{ label: __('Choose a Taxonomy', 'portfolio-block-pwp'), value: '' }]
        jQuery.each(taxonomies, function (key, val) {
          postTaxonomies.push({ label: val, value: val })
        })

        taxonomyBox = el(SelectControl, {
          className: 'pwp-dropdown',
          label: __('Select a Taxonomy', 'portfolio-block-pwp'),
          value: posttaxonomy,
          options: postTaxonomies,
          __nextHasNoMarginBottom: true,
          onChange: function (val) { props.setAttributes({ posttaxonomy: val }) }
        })
      } else {
        taxonomyBox = ''
      }

      // Add Category or products based on post type chosen
      if (posttype === 'product' && props.wooCats) {
        postCategories = []
        jQuery.each(props.wooCats, function (key, val) {
          postCategories.push({ label: val.name, value: val.name })
        })
      } else if (props.categories) {
        postCategories = []
        jQuery.each(props.categories, function (key, val) {
          postCategories.push({ label: val.name, value: val.name })
        })
      }

      // Check if post type, taxonomy, and categories are selected
      var isConfigured = posttype && posttaxonomy && postcategory && postcategory.length > 0;

      // Fallback message if not configured and not in editMode
      var fallbackMessage = (!isConfigured && !editMode) ? el('div', { className: 'pwp-block-not-configured' },
        el('p', { style: { margin: 0, display: 'block', padding: '12px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '3px', border: '1px solid #f5c6cb' } },
            __('Please select a post type, taxonomy, and categories within the block options in order to display content in this block.', 'portfolio-block-pwp')
        )
      ) : null;

      // Ensure categories are selected or set an empty array
      var selectedCategories = postcategory || [];

      if (props.categories) {
        categoryBox = el(BaseControl, {
            label: __('Select Categories', 'portfolio-block-pwp'),
            help: __('Check the categories you want to include.', 'portfolio-block-pwp'),
            className: 'pwp-dropdown pwp-multi-select components-base-control__field',
            __nextHasNoMarginBottom: true,
        },
        el('ul', null,
            props.categories.map((category) => {
                return el('li', { key: category.id, className: 'category-checkbox components-flex components-h-stack' },
                    el(CheckboxControl, {
                        label: category.name,
                        checked: selectedCategories.includes(category.name),
                        __nextHasNoMarginBottom: true,
                        onChange: function (isChecked) {
                            let newCategories;
                            if (isChecked) {
                                newCategories = [...selectedCategories, category.name];
                            } else {
                                newCategories = selectedCategories.filter((name) => name !== category.name);
                            }
                            props.setAttributes({ postcategory: newCategories });
                        }
                    })
                );
            })
        ));
      }

      // Show front end of plugin if not in edit mode
      var displayEditor = ''

      if (!editMode) {
        displayEditor = el(
          ServerSideRender,
          {
            block: 'pwp/portfolio-block',
            className: 'portfolio-block-pwp',
            attributes: {
              editMode: editMode,
              position: position,
              posttype: posttype,
              posttaxonomy: posttaxonomy,
              postcategory: postcategory,
              textalignment: textalignment,
              portlayout: portlayout,
              postorder: postorder,
              randomize: randomize,
              portheading: portheading,
              portheadingsize: portheadingsize,
              portbodysize: portbodysize,
              portcatsize: portcatsize,
              porttitle: porttitle,
              portcat: portcat,
              portexcerpt: portexcerpt,
              portbutton: portbutton,
              portlink: portlink,
              portcontent: portcontent,
              portpagination: portpagination,
              masonrylayout: masonrylayout,
              filternav: filternav,
              filtersearch: filtersearch,
              portcolumns: portcolumns,
              maxposts: maxposts,
              offset: offset,
              gutterwidth: gutterwidth,
              porttitlecolor: porttitlecolor,
              porttextcolor: porttextcolor,
              porticoncolor: porticoncolor,
              portbgcolor: portbgcolor,
              buttoncolor: buttoncolor,
              buttonbg: buttonbg,
              buttongradient: buttongradient,
              porthovercolor: porthovercolor,
              porthoveropacity: porthoveropacity,
              styleradius: styleradius,
              styleshadow: styleshadow,
              styleborderwidth: styleborderwidth,
              stylebordercolor: stylebordercolor,
              styleshadowcolor: styleshadowcolor,
              stylepadhoriz: stylepadhoriz,
              stylepadvert: stylepadvert,
              portfolioid: portfolioid
            }
          }
        )
      } else {
        displayEditor = el(
          Placeholder,
          {
            className: 'pwp-setup'
          },
          el('div',
            {
              className: 'pwp-setup-header'
            },
            el('div',
              {
                className: 'pwp-setup-icon'
              },
              portfolioIcon
            ),
            el(
              'h4',
              {
                className: 'pwp-setup-title'
              },
              __('Portfolio', 'portfolio-block-pwp')
            ),
            el(
              'p',
              {
                className: 'pwp-setup-description'
              },
              __('Display a group of posts as a portfolio.', 'portfolio-block-pwp')
            )
          ),
          postTypeBox,
          taxonomyBox,
          categoryBox,
          el(
            Button,
            {
              className: 'is-button is-default is-secondary',
              onClick: function () { props.setAttributes({ editMode: false }) }
            },
            __('Done', 'portfolio-block-pwp')
          )
        )
      }

      // Return editor content and controls/settings

      return [
        el(
          BlockControls,
          { key: 'controls' },
          el(AlignmentToolbar, {
            value: textalignment,
            onChange: function (val) { props.setAttributes({ textalignment: val }) }
          }),
          el('div', { className: 'components-toolbar-group components-toolbar' },
            el(BlockAlignmentMatrixControl, {
              value: position,
              onChange: function (val) { props.setAttributes({ position: val }) }
            })
          ),
          el('div', { className: 'components-toolbar' },
            el(
              IconButton,
              {
                icon: 'edit',
                className: 'components-toolbar-button pwp-toolbar-button',
                label: __('Done', 'portfolio-block-pwp'),
                onClick: function () { props.setAttributes({ editMode: !editMode }) }
              }
            )
          )
        ),
        // Display fallback message or the block content
        fallbackMessage || displayEditor,
        el(
          InspectorControls,
          null,
          el(PanelBody,
            {
              title: __('Settings', 'portfolio-block-pwp')
            },
            postTypeBox,
            taxonomyBox,
            categoryBox,
            el(SelectControl, {
              label: __('Select Post Order', 'portfolio-block-pwp'),
              value: postorder,
              options: orderOptions,
              help: __('Select the order in which your posts are displayed.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ postorder: val }) }
            }),
            el(ToggleControl, {
              label: __('Randomize Order', 'portfolio-block-pwp'),
              checked: randomize,
              disabled: !licenseActive, // Disable the control if the license is not active
              help: !licenseActive ? el('span', null,
                  __('Enable random portfolio placement. ', 'portfolio-block-pwp'),
                  upgradeLink,
                  __(' to enable.', 'portfolio-block-pwp')
              ) : __('Enable random portfolio placement.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  if (licenseActive) {
                      props.setAttributes({ randomize: val });
                  }
              }
            }),
            el(TextControl, {
              label: __('Maximum Number Posts', 'portfolio-block-pwp'),
              type: 'number',
              min: 1,
              max: 999,
              value: maxposts,
              help: __('Set maximum number of posts displayed.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ maxposts: val }) }
            }),
            el(TextControl, {
              label: __('Offset Posts', 'portfolio-block-pwp'),
              type: 'number',
              min: 0,
              max: 999,
              value: offset,
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ offset: val }) }
            }),
            el(TextControl, {
              label: __('Unique Portfolio ID', 'portfolio-block-pwp'),
              type: 'number',
              min: 1,
              max: 9999,
              value: portfolioid,
              help: __('Set a unique ID for the portfolio.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ portfolioid: val }) }
            }),
          ),
          el(PanelBody,
            {
              title: __('Display', 'portfolio-block-pwp'),
              initialOpen: true,
              icon: 'visibility'
            },
            el(ToggleControl, {
              label: __('Filter Portfolio By Taxonomy', 'portfolio-block-pwp'),
              checked: filternav,
              disabled: !licenseActive || !props.attributes.masonrylayout, // Disable if license is not active or masonrylayout is not enabled
              help: !licenseActive ? el('span', null,
                  __('Enable portfolio filter by categories. ', 'portfolio-block-pwp'),
                  upgradeLink,
                  __(' to enable.', 'portfolio-block-pwp')
              ) : !props.attributes.masonrylayout ? el('span', null,
                  __('The Masonry Layout option must be enabled for filtering to work.', 'portfolio-block-pwp')
              ) : __('Enable portfolio filter by categories.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  if (licenseActive && props.attributes.masonrylayout) {
                      props.setAttributes({ filternav: val });
                  }
              }
            }),            
            (filternav === true) && licenseActive && (
              el(ToggleControl, {
                label: __('Filter Search Field', 'portfolio-block-pwp'),
                checked: filtersearch,
                __nextHasNoMarginBottom: true,
                onChange: function (val) { props.setAttributes({ filtersearch: val }) }
              })
            ),
            el(ToggleControl, {
              label: __('Portfolio Title', 'portfolio-block-pwp'),
              checked: porttitle,
              help: __('Enable display of portfolio title.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ porttitle: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Categories', 'portfolio-block-pwp'),
              checked: portcat,
              help: __('Enable display of portfolio categories.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ portcat: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Excerpt', 'portfolio-block-pwp'),
              checked: portexcerpt,
              help: __('Enable display of portfolio excerpt.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ portexcerpt: val }) }
            }),
            el(ToggleControl, {
              label: __('Pinterest Button', 'portfolio-block-pwp'),
              checked: portbutton,
              help: __('Enable the Pinterest Pin It button.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ portbutton: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Link', 'portfolio-block-pwp'),
              checked: portlink,
              help: __('Enable the portfolio link to post.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ portlink: val }) }
            }),
            el(ToggleControl, {
              label: __('Portfolio Pagination', 'portfolio-block-pwp'),
              checked: portpagination,
              disabled: !licenseActive, // Disable the control if the license is not active
              help: !licenseActive ? el('span', null,
                  __('Enable display of portfolio pagination links. ', 'portfolio-block-pwp'),
                  upgradeLink,
                  __(' to enable.', 'portfolio-block-pwp')
              ) : __('Enable display of portfolio pagination links.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  if (licenseActive) {
                      props.setAttributes({ portpagination: val });
                  }
              }
            }),
            el(ToggleControl, {
              label: __('Show Portfolio Content On Hover', 'portfolio-block-pwp'),
              checked: portcontent,
              help: __('Enable to display content only on hover.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ portcontent: val }) }
          })
          ),
          el(PanelBody,
            {
              title: __('Layout', 'portfolio-block-pwp'),
              initialOpen: true,
              icon: 'move'
            },
            el(SelectControl, {
              label: __('Content Position', 'portfolio-block-pwp'),
              value: portlayout,
              options: layoutOptions,
              help: __('Select where the content is displayed in relation to the image.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ portlayout: val }) }
            }),
            el(ToggleControl, {
              label: __('Masonry Grid Layout', 'portfolio-block-pwp'),
              checked: masonrylayout,
              disabled: !licenseActive, // Disable the control if the license is not active
              help: !licenseActive ? el('span', null,
                  __('Use masonry script to fit together portfolio items like puzzle pieces. ', 'portfolio-block-pwp'),
                  upgradeLink,
                  __(' to enable.', 'portfolio-block-pwp')
              ) : __('Use masonry script to fit together portfolio items like puzzle pieces.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  if (licenseActive) {
                      props.setAttributes({ masonrylayout: val });
                  }
              }
            }),
            el(RangeControl, {
              label: __('Columns', 'portfolio-block-pwp'),
              min: 1,
              max: licenseActive ? 6 : 2, // Set max to 6 if license is active, otherwise max is 2
              value: portcolumns,
              help: !licenseActive ? el('span', null,
                  __('Set how many columns of portfolio items to display. ', 'portfolio-block-pwp'),
                  upgradeLink,
                  __(' to enable more columns.', 'portfolio-block-pwp')
              ) : __('Set how many columns of portfolio items to display.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  props.setAttributes({ portcolumns: val });
              }
            }),          
            el(TextControl, {
              label: __('Gutter Width', 'portfolio-block-pwp'),
              type: 'number',
              min: 0,
              value: gutterwidth,
              help: __('Set the space between portfolio items.', 'portfolio-block-pwp'),
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ gutterwidth: val }) }
            })
          )
        ),
        el(
          InspectorControls, {
            group: 'styles',
          },
          el(PanelBody,
            {
              title: __('Typography', 'portfolio-block-pwp')
            },
            el(SelectControl, {
              label: __('Title HTML Heading Tag', 'portfolio-block-pwp'),
              value: portheading,
              options: headingOptions,
              disabled: !licenseActive, // Disable the control if the license is not active
              help: !licenseActive ? el('span', null,
                  __('Upgrade to enable this option.', 'portfolio-block-pwp'),
                  ' ',
                  upgradeLink
              ) : null,
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                if (licenseActive) {
                    props.setAttributes({ portheading: val });
                }
              }
            }),
            el(BaseControl,
              {
                help: !licenseActive ? el('span', null,
                    __('Upgrade to change font size for portfolio title.', 'portfolio-block-pwp'),
                    ' ',
                    upgradeLink
                ) : __('Change font size for portfolio title.', 'portfolio-block-pwp'),
                __nextHasNoMarginBottom: true,
              },
              el(UnitControl, {
                  label: __('Title Font Size', 'portfolio-block-pwp'),
                  type: 'number',
                  units: unitTypes,
                  value: portheadingsize,
                  disabled: !licenseActive, // Disable the control if the license is not active
                  onChange: function (val) {
                      if (licenseActive) {
                          props.setAttributes({ portheadingsize: val });
                      }
                  }
              })
            ),          
            el(BaseControl,
              {
                help: !licenseActive ? el('span', null,
                    __('Upgrade to change font size for portfolio excerpt.', 'portfolio-block-pwp'),
                    ' ',
                    upgradeLink
                ) : __('Change font size for portfolio excerpt.', 'portfolio-block-pwp'),
                __nextHasNoMarginBottom: true,
              },
              el(UnitControl, {
                  label: __('Excerpt Font Size', 'portfolio-block-pwp'),
                  type: 'number',
                  units: unitTypes,
                  value: portbodysize,
                  disabled: !licenseActive, // Disable the control if the license is not active
                  onChange: function (val) {
                      if (licenseActive) {
                          props.setAttributes({ portbodysize: val });
                      }
                  }
              })
            ),
            el(BaseControl,
              {
                help: !licenseActive ? el('span', null,
                    __('Upgrade to change font size for portfolio categories.', 'portfolio-block-pwp'),
                    ' ',
                    upgradeLink
                ) : __('Change font size for portfolio categories.', 'portfolio-block-pwp'),
                __nextHasNoMarginBottom: true,
              },
              el(UnitControl, {
                  label: __('Categories Font Size', 'portfolio-block-pwp'),
                  type: 'number',
                  units: unitTypes,
                  value: portcatsize,
                  disabled: !licenseActive, // Disable the control if the license is not active
                  onChange: function (val) {
                      if (licenseActive) {
                          props.setAttributes({ portcatsize: val });
                      }
                  }
              })
            )
          ),
          el(PanelColorSettings, {
            title: __('Colors', 'portfolio-block-pwp'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
              {
                label: __('Title Color', 'portfolio-block-pwp'),
                value: porttitlecolor,
                onChange: function (val) { props.setAttributes({ porttitlecolor: val }) }
              },
              {
                label: __('Excerpt & Category Color', 'portfolio-block-pwp'),
                value: porttextcolor,
                onChange: function (val) { props.setAttributes({ porttextcolor: val }) }
              },
              {
                label: __('Pin Icon Color', 'portfolio-block-pwp'),
                value: porticoncolor,
                onChange: function (val) { props.setAttributes({ porticoncolor: val }) }
              },
              {
                label: __('Background Color', 'portfolio-block-pwp'),
                value: portbgcolor,
                onChange: function (val) { props.setAttributes({ portbgcolor: val }) }
              },
              (filternav === true) && (
                {
                  label: __('Filter Button Text Color', 'portfolio-block-pwp'),
                  value: buttoncolor,
                  onChange: function (val) { props.setAttributes({ buttoncolor: val }) }
                }
              ),
              (filternav === true) && (
                {
                  label: __('Filter Button Background', 'portfolio-block-pwp'),
                  gradients: gradientOptions,
                  value: buttonbg,
                  gradientValue: buttongradient,
                  onChange: function (val) { props.setAttributes({ buttonbg: val }) },
                  onGradientChange: function (val) { props.setAttributes({ buttongradient: val }) }
                }
              )
            ]
          },
          el('div', null, // Use a div wrapper if necessary to contain multiple elements
            el(BaseControl, {
                label: __('Content Background Color', 'portfolio-block-pwp'),
                help: __('Select the color for the hover overlay.', 'portfolio-block-pwp'),
                __nextHasNoMarginBottom: true,
            },
            el(ColorPalette, {
                value: porthovercolor,
                onChange: function (val) { props.setAttributes({ porthovercolor: val }) }
            })),
            el(RangeControl, {
                label: __('Content Background Opacity', 'portfolio-block-pwp'),
                max: 1.0,
                min: 0.0,
                step: 0.05,
                value: porthoveropacity,
                __nextHasNoMarginBottom: true,
                onChange: function (val) { props.setAttributes({ porthoveropacity: val }) }
            })
          )),
          el(PanelColorSettings, {
            title: __('Borders & Shadows', 'portfolio-block-pwp'),
            initialOpen: true,
            enableAlpha: true,
            disableCustomColors: false,
            disableCustomGradients: false,
            colorSettings: [
                {
                    label: __('Border Color', 'portfolio-block-pwp'),
                    value: stylebordercolor,
                    disabled: !licenseActive, // Disable the control if the license is not active
                    onChange: function (val) {
                        if (licenseActive) {
                            props.setAttributes({ stylebordercolor: val });
                        }
                    }
                },
                {
                    label: __('Shadow Color', 'portfolio-block-pwp'),
                    value: styleshadowcolor,
                    disabled: !licenseActive, // Disable the control if the license is not active
                    onChange: function (val) {
                        if (licenseActive) {
                            props.setAttributes({ styleshadowcolor: val });
                        }
                    }
                }
            ],
            help: !licenseActive ? el('span', null,
                __('Upgrade to change border and shadow colors.', 'portfolio-block-pwp'),
                ' ',
                upgradeLink
            ) : null
          },
          el(RangeControl, {
              label: __('Border Radius', 'portfolio-block-pwp'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 100,
              step: 1,
              value: styleradius,
              disabled: !licenseActive, // Disable the control if the license is not active
              help: !licenseActive ? el('span', null,
                  __('Upgrade to adjust border radius.', 'portfolio-block-pwp'),
                  ' ',
                  upgradeLink
              ) : null,
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  if (licenseActive) {
                      props.setAttributes({ styleradius: val });
                  }
              }
          }),
          el(RangeControl, {
              label: __('Border Width', 'portfolio-block-pwp'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 20,
              step: 1,
              value: styleborderwidth,
              disabled: !licenseActive, // Disable the control if the license is not active
              help: !licenseActive ? el('span', null,
                  __('Upgrade to adjust border width.', 'portfolio-block-pwp'),
                  ' ',
                  upgradeLink
              ) : null,
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  if (licenseActive) {
                      props.setAttributes({ styleborderwidth: val });
                  }
              }
          }),
          el(RangeControl, {
              label: __('Shadow Size', 'portfolio-block-pwp'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 100,
              step: 1,
              value: styleshadow,
              disabled: !licenseActive, // Disable the control if the license is not active
              help: !licenseActive ? el('span', null,
                  __('Upgrade to adjust shadow size.', 'portfolio-block-pwp'),
                  ' ',
                  upgradeLink
              ) : null,
              __nextHasNoMarginBottom: true,
              onChange: function (val) {
                  if (licenseActive) {
                      props.setAttributes({ styleshadow: val });
                  }
              }
          })),
          el(PanelBody,
            {
              title: __('Content Padding', 'portfolio-block-pwp')
            },
            el(RangeControl, {
              label: __('Horizontal Padding', 'portfolio-block-pwp'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 60,
              step: 2,
              value: stylepadhoriz,
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ stylepadhoriz: val }) }
            }),
            el(RangeControl, {
              label: __('Vertical Padding', 'portfolio-block-pwp'),
              withInputField: true,
              allowReset: true,
              resetFallbackValue: 0,
              min: 0,
              max: 60,
              step: 2,
              value: stylepadvert,
              __nextHasNoMarginBottom: true,
              onChange: function (val) { props.setAttributes({ stylepadvert: val }) }
            })
          )
        )
      ]
    }),

    save: function (props) {
      return null
    }
  })
})(
  window.wp.data,
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.element,
  window.wp.i18n,
  window.wp.serverSideRender,
  window.wp.apiFetch
)
