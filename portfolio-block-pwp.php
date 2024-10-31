<?php
/**
 * Plugin Name: Portfolio Block
 * Plugin URI: https://portfoliowp.com
 * Description: A WordPress Portfolio Block for the Gutenberg and Full Site editor. The block displays a selected post type in a masonry style portfolio layout with filterable categories.
 * Version: 1.2.3
 * Author: PortfolioWP
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: portfolio-block-pwp
 * Domain Path: /languages
 *
 * @package PortfolioWP Portfolio Block
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'PortfolioWP_Portfolio_Block_Plugin' ) ) {

	/**
	 * Main Portfolio Block Class.
	 */
	class PortfolioWP_Portfolio_Block_Plugin {

		/**
		 * Instance variable.
		 */
		private static $instance;

		/**
		 * Get instance of the class.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor.
		 */
		public function __construct() {
			$this->define_constants();
			$this->loader();

			add_action( 'init', array( $this, 'portfoliowp_portfolio_register_block_types' ) );
			add_action( 'enqueue_block_assets', array( $this, 'portfoliowp_enqueue_block_assets' ) );
			add_filter( 'block_categories_all', array( $this, 'portfoliowp_portfolio_block_category' ), 10, 2 );
		}

		/**
		 * Define constants for paths.
		 */
		public function define_constants() {
			define( 'PORTFOLIOWP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
			define( 'PORTFOLIOWP_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );
		}

		/**
		 * Load block classes.
		 */
		public function loader() {
			require_once PORTFOLIOWP_PLUGIN_DIR_PATH . 'classes/class-pwp-portfolio.php';
			require_once PORTFOLIOWP_PLUGIN_DIR_PATH . 'classes/class-pwp-edd.php';
			new PortfolioWP_Portfolio_EDD();
		}

		/**
		 * Add custom block category.
		 *
		 * @param array $categories List of categories.
		 * @param int   $post       Post ID.
		 */
		public function portfoliowp_portfolio_block_category( $categories, $post ) {
			return array_merge(
				$categories,
				array(
					array(
						'slug'  => 'pwp-blocks',
						'title' => __( 'PortfolioWP Blocks', 'portfolio-block-pwp' ),
					),
				)
			);
		}

		/**
		 * Enqueue block styles and scripts.
		 */
		public function portfoliowp_enqueue_block_assets() {

			// Frontend & Backend Styles.
			wp_enqueue_style(
				'portfolio-block-pwp-front-end-styles',
				PORTFOLIOWP_PLUGIN_URL . '/css/style.css',
				array(),
				filemtime( PORTFOLIOWP_PLUGIN_DIR_PATH . 'css/style.css' )
			);
			wp_enqueue_style(
				'portfolio-block-pwp-dynamic-styles',
				PORTFOLIOWP_PLUGIN_URL . '/css/dynamic-styles.css',
				array(),
				filemtime( PORTFOLIOWP_PLUGIN_DIR_PATH . 'css/dynamic-styles.css' )
			);

			// Editor Only Styles.
			if ( is_admin() ) {
				wp_enqueue_style(
					'portfolio-block-pwp-editor-styles',
					PORTFOLIOWP_PLUGIN_URL . '/css/editor.css',
					array( 'wp-edit-blocks' ),
					filemtime( PORTFOLIOWP_PLUGIN_DIR_PATH . 'css/editor.css' )
				);
			}

			// Editor script.
			wp_enqueue_script(
				'portfolio-block-pwp-editor-js',
				PORTFOLIOWP_PLUGIN_URL . '/blocks/portfolio-block.js',
				array( 'wp-data', 'wp-api-fetch', 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'pwp-masonry-initialize' ),
				filemtime( PORTFOLIOWP_PLUGIN_DIR_PATH . 'blocks/portfolio-block.js' ),
				true
			);

			// Localize the script with the license status.
			wp_localize_script( 'portfolio-block-pwp-editor-js', 'pwpPortfolioLicense', array(
				'isValid' => PortfolioWP_Portfolio_EDD::is_valid(),
			));

			// Front-end script for Isotope and Masonry.
			wp_enqueue_script( 'pwp-isotope', PORTFOLIOWP_PLUGIN_URL . '/js/jquery.isotope.js', array( 'jquery', 'masonry' ), filemtime( PORTFOLIOWP_PLUGIN_DIR_PATH . 'js/jquery.isotope.js' ), true );
			wp_enqueue_script( 'pwp-masonry-initialize', PORTFOLIOWP_PLUGIN_URL . '/js/masonry-setup.js', array( 'pwp-isotope', 'imagesloaded' ), filemtime( PORTFOLIOWP_PLUGIN_DIR_PATH . 'js/masonry-setup.js' ), true );
		}

		/**
		 * Register Gutenberg block.
		 */
		public function portfoliowp_portfolio_register_block_types() {
			register_block_type(
				'pwp/portfolio-block',
				array(
					'style'           => 'portfolio-block-pwp-front-end-styles',
					'script'          => 'pwp-masonry-initialize',
					'editor_style'    => 'portfolio-block-pwp-editor-styles',
					'editor_script'   => 'portfolio-block-pwp-editor-js',
					'attributes'      => array_merge( PortfolioWP_Portfolio_Block::get_attributes(), array(
						'portfolioid' => array(
							'type'    => 'string',
							'default' => '',
						),
					)),
					'render_callback' => function ( $attributes, $content, $block ) {
						// Enqueue any required scripts
						wp_enqueue_script( 'pwp-pinterest', '//assets.pinterest.com/js/pinit.js', array(), '1.0', true );
						
						// Call the render function with the correct arguments
						return PortfolioWP_Portfolio_Block::render_block_html( $attributes, $content, $block );
					},
				)
			);
		}
	}

	PortfolioWP_Portfolio_Block_Plugin::get_instance();
}
