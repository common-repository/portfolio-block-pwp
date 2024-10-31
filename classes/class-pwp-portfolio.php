<?php
/**
 * Portfolio Block PWP Class
 *
 * @package PortfolioWP Portfolio Block
 * @since PortfolioWP Portfolio Block 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	die();
}

if ( ! class_exists( 'PortfolioWP_Portfolio_Block' ) ) {

	/**
	 * Class for Portfolio block.
	 */
	class PortfolioWP_Portfolio_Block {

		/**
		 * Setup instance for block.
		 *
		 * @var $instance Instance variable.
		 */
		private static $instance;

		/**
		 * Get instance for block.
		 */
		public static function get_instance() {

			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Get attributes for block.
		 */
		public static function get_attributes() {

			$atts = array(
				'editMode'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'position'         => array(
					'type'    => 'string',
					'default' => 'center center',
				),
				'textalignment'    => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'postcategory'     => array(
					'type' => 'array',
				),
				'posttype'         => array(
					'type' => 'string',
				),
				'posttaxonomy'     => array(
					'type' => 'string',
				),
				'portlayout'       => array(
					'type'    => 'string',
					'default' => 'position-overlay',
				),
				'postorder'        => array(
					'type'    => 'string',
					'default' => 'DESC',
				),
				'randomize'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'portheading'      => array(
					'type'    => 'string',
					'default' => 'h4',
				),
				'portheadingsize'  => array(
					'type'    => 'string',
					'default' => '24px',
				),
				'portbodysize'     => array(
					'type'    => 'string',
					'default' => '16px',
				),
				'portcatsize'     => array(
					'type'    => 'string',
					'default' => '14px',
				),
				'porttitle'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portcat'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portexcerpt'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'portbutton'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portlink'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'portcontent'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'portpagination'   => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'masonrylayout'    => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'filternav'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'filtersearch'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'portcolumns'      => array(
					'type'    => 'number',
					'default' => 2,
				),
				'maxposts'         => array(
					'type'    => 'string',
					'default' => '12',
				),
				'offset'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'gutterwidth'      => array(
					'type'    => 'string',
					'default' => '24',
				),
				'porttitlecolor'   => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'porttextcolor'    => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'porticoncolor'    => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'portbgcolor'    => array(
					'type'    => 'string',
					'default' => '#fff',
				),
				'buttoncolor'      => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'buttonbg'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'buttongradient'   => array(
					'type'    => 'string',
				),
				'porthovercolor'   => array(
					'type'    => 'string',
					'default' => '#000',
				),
				'porthoveropacity' => array(
					'type'    => 'number',
					'default' => 0.5,
				),
				'styleradius'      => array(
					'type'    => 'number',
					'default' => 0,
				),
				'styleborderwidth' => array(
					'type'    => 'number',
					'default' => 0,
				),
				'stylebordercolor' => array(
					'type'    => 'string',
					'default' => '#ccc',
				),
				'styleshadow'      => array(
					'type'    => 'number',
					'default' => 0,
				),
				'styleshadowcolor' => array(
					'type'    => 'string',
					'default' => '#ccc',
				),
				'stylepadhoriz'    => array(
					'type'    => 'number',
					'default' => 16,
				),
				'stylepadvert'      => array(
					'type'    => 'number',
					'default' => 16,
				),
				'portfolioid'       => array(
					'type'    => 'string',
					'default' => '',
				)
			);

			return $atts;
		}

		/**
		 * Render block.
		 *
		 * @param array $att Block attributes.
		 */
		public static function render_block_html( $att, $content, $block ) {

			if ( empty( $att['portfolioid'] ) ) {
				$att['portfolioid'] = 'pwp-portfolio-' . wp_rand();
			}
		
			$portfolioid = esc_attr( $att['portfolioid'] );

			$position           = ( isset( $att['position'] ) ) ? $att['position'] : 'center center';
			$portlayout         = ( isset( $att['portlayout'] ) ) ? $att['portlayout'] : 'position-overlay';
			$textalignment      = ( isset( $att['textalignment'] ) ) ? $att['textalignment'] : 'center';
			$portheading        = ( isset( $att['portheading'] ) ) ? $att['portheading'] : 'h4';
			$portheadingsize    = ( isset( $att['portheadingsize'] ) ) ? $att['portheadingsize'] : '24px';
			$portbodysize       = ( isset( $att['portbodysize'] ) ) ? $att['portbodysize'] : '16px';
			$portcatsize        = ( isset( $att['portcatsize'] ) ) ? $att['portcatsize'] : '14px';
			$porttitle          = ( isset( $att['porttitle'] ) ) ? $att['porttitle'] : true;
			$portcat            = ( isset( $att['portcat'] ) ) ? $att['portcat'] : true;
			$portexcerpt        = ( isset( $att['portexcerpt'] ) ) ? $att['portexcerpt'] : false;
			$portbutton         = ( isset( $att['portbutton'] ) ) ? $att['portbutton'] : true;
			$portlink           = ( isset( $att['portlink'] ) ) ? $att['portlink'] : true;
			$portcontent        = ( isset( $att['portcontent'] ) ) ? $att['portcontent'] : false;
			$portpagination     = ( isset( $att['portpagination'] ) ) ? $att['portpagination'] : false;
			$masonrylayout      = ( isset( $att['masonrylayout'] ) ) ? $att['masonrylayout'] : false;
			$filternav          = ( isset( $att['filternav'] ) ) ? $att['filternav'] : false;
			$filtersearch       = ( isset( $att['filtersearch'] ) ) ? $att['filtersearch'] : false;
			$portcolumns        = ( isset( $att['portcolumns'] ) ) ? $att['portcolumns'] : 2;
			$maxposts           = ( isset( $att['maxposts'] ) ) ? $att['maxposts'] : 12;
			$offset             = ( isset( $att['offset'] ) ) ? $att['offset'] : '';
			$gutterwidth        = ( isset( $att['gutterwidth'] ) ) ? $att['gutterwidth'] : 24;
			$port_title_color   = ( isset( $att['porttitlecolor'] ) ) ? $att['porttitlecolor'] : '#fff';
			$port_text_color    = ( isset( $att['porttextcolor'] ) ) ? $att['porttextcolor'] : '#fff';
			$port_icon_color    = ( isset( $att['porticoncolor'] ) ) ? $att['porticoncolor'] : '#fff';
			$port_bg_color      = ( isset( $att['portbgcolor'] ) ) ? $att['portbgcolor'] : '#fff';
			$button_color       = ( isset( $att['buttoncolor'] ) ) ? $att['buttoncolor'] : '#000';
			$button_bg          = ( isset( $att['buttonbg'] ) ) ? $att['buttonbg'] : '';
			$button_gradient    = ( isset( $att['buttongradient'] ) ) ? $att['buttongradient'] : '';
			$port_hover_color   = ( isset( $att['porthovercolor'] ) ) ? $att['porthovercolor'] : '#000';
			$port_hover_opactiy = ( isset( $att['porthoveropacity'] ) ) ? $att['porthoveropacity'] : 0.5;
			$styleradius		= ( isset( $att['styleradius'] ) ) ? $att['styleradius'] : 0;
			$styleborderwidth	= ( isset( $att['styleborderwidth'] ) ) ? $att['styleborderwidth'] : 0;
			$stylebordercolor	= ( isset( $att['stylebordercolor'] ) ) ? $att['stylebordercolor'] : '#ccc';
			$styleshadow		= ( isset( $att['styleshadow'] ) ) ? $att['styleshadow'] : '';
			$styleshadowcolor	= ( isset( $att['styleshadowcolor'] ) ) ? $att['styleshadowcolor'] : '#ccc';
			$stylepadhoriz  	= ( isset( $att['stylepadhoriz'] ) ) ? $att['stylepadhoriz'] : 16;
			$stylepadvert   	= ( isset( $att['stylepadvert'] ) ) ? $att['stylepadvert'] : 16;

			$alignment = ( isset( $att['align'] ) ) ? $att['align'] : '';

			// Initialize $classes to ensure it's defined.
			$classes = '';

			// Add Classes based on settings.
			if ( isset( $att['align'] ) ) {
				$classes = 'align' . $alignment . ' ';
			}
			$positionclass = 'pwp-position-' . str_replace( ' ', '-', $position );
			$layoutclass   = 'pwp-content-' . $portlayout;
			$classes      .= $positionclass . ' ';
			$classes      .= $layoutclass . ' ';
			if ( ! empty( $att['className'] ) ) {
				$classes .= sprintf( ' %s', $att['className'] );
			}
			if ( true !== $masonrylayout ) {
				$classes .= 'pwp-masonry-off';
			}
			if ( $masonrylayout ) {
				$classes .= 'pwp-masonry';
			}
			if ( $portcontent ) {
				$classes .= ' pwp-hover-content';
			}

			// Declare filter class variables.
			$filter_classes  = '';
			$filternav_class = '';

			if ( true === $masonrylayout ) {
				$masonry_class = 'pwp-masonry-wrapper';
			} else {
				$masonry_class = '';
			}

			ob_start();

			$paged = 1;

			if ( get_query_var( 'paged' ) ) {
				$paged = get_query_var( 'paged' );
			} elseif ( get_query_var( 'page' ) ) {
				$paged = get_query_var( 'page' );
			}

			// Portfolio Query Arguments.
			$post_type = ( isset( $att['posttype'] ) ) ? $att['posttype'] : 'post';
			$postorder = ( isset( $att['postorder'] ) ) ? $att['postorder'] : 'DESC';
			$randomize = ( isset( $att['randomize'] ) ) ? $att['randomize'] : false;
			$taxonomy  = ( isset( $att['posttaxonomy'] ) ) ? $att['posttaxonomy'] : 0;
			$category  = ( isset( $att['postcategory'] ) ) ? $att['postcategory'] : 0;

			$args = array(
				'paged'            => $paged,
				'posts_per_page'   => $maxposts,
				'offset'           => $offset,
				'post_type'        => $post_type,
				'order'            => $postorder,
				'suppress_filters' => 0,
			);

			// Add additional args based on post type & taxonomy selected
			if ('product' === $post_type && !empty($category)) {
				$args['product_cat'] = implode(',', $category);
			} elseif ('category' !== $taxonomy && $taxonomy && ! empty($category)) {
				$args['tax_query'] = array(
					array(
						'taxonomy' => $taxonomy,
						'field'    => 'name',
						'terms'    => $category,
					),
				);
			} elseif (!empty($category) && count($category) > 0) {
				$args['category_name'] = implode(',', $category);
			}
			if (true === $randomize) {
				$args['orderby'] = 'rand';
			}

			$portfolio_query = new WP_Query( $args );

			?>

			<?php if ( $portfolio_query->have_posts() ) : ?>

					<!--  BEGIN .pwp-block  -->
					<div id="pwp-portfolio-<?php echo esc_attr( $portfolioid ); ?>" data-id="pwp-portfolio-<?php echo esc_attr( $portfolioid ); ?>" class="pwp-block pwp-portfolio clearfix <?php echo esc_attr( $classes ); ?>" <?php if ( 'full' === $alignment ) { ?>
						style="padding-left: <?php echo esc_attr( $gutterwidth ); ?>px; padding-right: <?php echo esc_attr( $gutterwidth ); ?>px;"<?php } ?>>

						<?php if ( true === $masonrylayout && true === $filternav && '' !== $taxonomy ) { ?>
						<div class="pwp-filter-nav">
							<div class="pwp-filter-buttons wp-block-button">
							<?php
							$terms = get_terms(
								array(
									'taxonomy'   => $taxonomy,
									'hide_empty' => true,
								)
							);
							$count = count( $terms ); // This counts the number of categories.
							echo '<button class="pwp-button wp-block-button__link secondary" data-filter="*">Show All</button>';
							if ( $count > 0 ) {
								foreach ( $terms as $term ) {
									$termname = strtolower( $term->name );
									$termname = str_replace( ' ', '-', $termname );
									echo '<button class="pwp-button wp-block-button__link secondary" data-filter=".' . esc_attr( $termname ) . '">' . esc_html( $term->name ) . '</button>';
								}
							} // In the above foreach loop, the code will return all the values stored in $terms array.
							?>
							</div>
							<?php if ( true === $filtersearch ) { ?>
							<div class="pwp-filter-search">
								<input type="text" class="quicksearch" placeholder="Search" />
							</div>
							<?php } ?>
						</div>
						<?php } ?>

						<?php
						if ( true === $masonrylayout && true === $filternav && '' !== $taxonomy ) {
							$filternav_class = ' pwp-isotope';
						}
						?>

						<!-- /** BEGIN .pwp-masonry-container */ -->
						<div class="pwp-masonry-container<?php echo esc_attr( $filternav_class ? $filternav_class : '' ); ?>" style="--pwp-gutter-width: <?php echo esc_attr( $gutterwidth ); ?>px;">

							<div class="pwp-grid-spacer" style="width: <?php echo esc_attr( $gutterwidth ); ?>px;"></div>

							<?php
							while ( $portfolio_query->have_posts() ) :
								$portfolio_query->the_post();
								?>

								<?php $terms = get_the_terms( get_the_ID(), $taxonomy ); ?>

								<?php
								if ( true === $masonrylayout && true === $filternav && '' !== $taxonomy ) {
									$slugs = array();
									foreach ( $terms as $term ) {
										$slugs[] = $term->slug;
									}
									$filter_classes = join( ' ', $slugs );
								}
								?>

								<?php $thumb = ( get_the_post_thumbnail() ) ? wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' ) : false; ?>
								<?php if ( has_post_thumbnail() ) { ?>

									<?php /** BEGIN .pwp-masonry-wrapper */ ?>
									<div class="<?php echo esc_attr( $masonry_class ); ?> pwp-content pwp-column pwp-columns-<?php echo esc_attr( $portcolumns ); ?> <?php echo esc_attr( $filter_classes ); ?>">

										<?php /** BEGIN .pwp-portfolio-item */ ?>
										<div class="pwp-portfolio-item" 
											style="
											--pwp-heading-size: <?php echo esc_attr( $portheadingsize ); ?>;
											--pwp-body-size: <?php echo esc_attr( $portbodysize ); ?>;
											--pwp-category-size: <?php echo esc_attr( $portcatsize ); ?>;
											--pwp-button-color: <?php echo esc_attr( $button_color ); ?>;
											--pwp-button-bg: <?php echo esc_attr( $button_bg ); ?>;
											--pwp-button-gradient: <?php echo esc_attr( $button_gradient ); ?>;
											--pwp-bg-color: <?php echo esc_attr( $port_bg_color ); ?>;
											--pwp-border-radius: <?php echo esc_attr( $styleradius ); ?>px;
											--pwp-border-width: <?php echo esc_attr( $styleborderwidth ); ?>px;
											--pwp-border-color: <?php echo esc_attr( $stylebordercolor ); ?>;
											--pwp-shadow: 0 0 <?php echo esc_attr( $styleshadow ); ?>px <?php echo esc_attr( $styleshadowcolor ); ?>;
											">

											<?php if ( $portbutton ) { ?>
												<a class="pwp-pin-link" href="https://www.pinterest.com/pin/create/button/" data-pin-do="buttonPin" data-pin-custom="true" data-pin-media="<?php echo esc_url( $thumb[0] ); ?>" data-pin-url="<?php echo esc_url( get_the_permalink() ); ?>">
													<svg class="pwp-pin-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style="fill:<?php echo esc_attr( $port_icon_color ); ?>" d="M6.166 16.943l1.4 1.4-4.622 4.657h-2.944l6.166-6.057zm11.768-6.012c2.322-2.322 4.482-.457 6.066-1.931l-8-8c-1.474 1.584.142 3.494-2.18 5.817-3.016 3.016-4.861-.625-10.228 4.742l9.6 9.6c5.367-5.367 1.725-7.211 4.742-10.228z"/></svg>
												</a>
											<?php } ?>

												<?php if ( $porttitle || $portcat || $portexcerpt ) { ?>

													<?php /** BEGIN .pwp-content */ ?>
													<div class="pwp-content"
														style="
														--pwp-padding-vertical: <?php echo esc_attr( $stylepadvert ); ?>px;
														--pwp-padding-horizontal: <?php echo esc_attr( $stylepadhoriz ); ?>px;
														">

														<div class="pwp-text" style="text-align: <?php echo esc_attr( $textalignment ); ?>;">

															<?php if ( $porttitle ) { ?>
																
																<?php if ( $portlink ) { ?>
																<a class="pwp-portfolio-link" rel="noreferrer" href="<?php echo ( esc_attr( $portlink ) ? esc_attr( get_the_permalink() ) : '#' ); ?>">
																<?php } ?>
																<<?php echo esc_html( $portheading ); ?> class="pwp-title" style="color:<?php echo esc_attr( $port_title_color ); ?>">
																	<?php the_title(); ?>
																</<?php echo esc_html( $portheading ); ?>>
																<?php if ( $portlink ) { ?>
																</a>
																<?php } ?>
																
															<?php } ?>

															<?php if ( $portcat ) { ?>
															<p class="pwp-categories" style="color:<?php echo esc_attr( $port_text_color ); ?>">
															<?php
																if ( 'jetpack-portfolio' === $post_type ) {
																	global $post;
																	$terms = get_the_terms( $post->ID, 'jetpack-portfolio-type' );
																	if ( !is_wp_error( $terms ) && !empty( $terms ) ) {
																		$links = array();
																		foreach ( $terms as $term ) {
																			$links[] = sprintf(
																				'<a href="%s" style="color:%s;" alt="%s">%s</a>',
																				esc_url( get_term_link( $term ) ),
																				esc_attr( $port_text_color ),
																				// translators: %s is the term name.
																				esc_attr( sprintf( __( 'View all projects in %s', 'portfolio-block-pwp' ), $term->name ) ),
																				esc_html( $term->name )
																			);
																		}
																		echo wp_kses( implode( ', ', $links ), array( 'a' => array( 'href' => array(), 'style' => array(), 'alt' => array() ) ) );
																	}
																} else {
																	$categories = get_the_category();
																	$separator = ', ';
																	$output = '';
																
																	if ( ! empty( $categories ) ) {
																		foreach ( $categories as $category ) {
																			$output .= sprintf(
																				'<a href="%s" style="color:%s;" alt="%s">%s</a>%s',
																				esc_url( get_category_link( $category->term_id ) ),
																				esc_attr( $port_text_color ),
																				// translators: %s is the category name.
																				esc_attr( sprintf( __( 'View all posts in %s', 'portfolio-block-pwp' ), $category->name ) ),
																				esc_html( $category->name ),
																				esc_html( $separator )
																			);
																		}
																		echo wp_kses( trim( $output, esc_html( $separator ) ), array( 'a' => array( 'href' => array(), 'style' => array(), 'alt' => array() ) ) );
																	}
																}																																
																?>
															</p>
															<?php } ?>

															<?php if ( $portexcerpt ) { ?>
															<div class="pwp-excerpt" style="color:<?php echo esc_attr( $port_text_color ); ?>">
																<?php the_excerpt(); ?>
															</div>
															<?php } ?>

														</div>

														<?php if ( ! empty( $port_hover_color ) ) { ?>
															<span class="pwp-bg-overlay"
															style="background-color: <?php echo esc_attr( $port_hover_color ); ?>;
															opacity: <?php echo esc_attr( $port_hover_opactiy ); ?>;"></span>
														<?php } ?>

													<?php /** END .pwp-content */ ?>
													</div>

												<?php } ?>

												<div class="pwp-featured-img">
													<?php if ( $portlink ) { ?>
													<a class="pwp-portfolio-link" rel="noreferrer" href="<?php echo ( esc_attr( $portlink ) ? esc_attr( get_the_permalink() ) : '#' ); ?>">
													<?php } ?>
														<?php the_post_thumbnail( 'large' ); ?>
													<?php if ( $portlink ) { ?>
													</a>
													<?php } ?>
												</div>

											<!-- </a> -->

										<?php /** END .pwp-portfolio-item */ ?>
										</div>

									<?php /** END .pwp-masonry-wrapper */ ?>
									</div>

							<?php } ?>

							<?php endwhile; ?>

						<?php /** END .pwp-masonry-container */ ?>
						</div>

						<?php if ( true === $portpagination ) { ?>

							<?php if ( $portfolio_query->max_num_pages > 1 ) { ?>

								<div class="pwp-pagination">

									<nav class="pagination navigation">

										<?php
											$big = 999999999;
											echo wp_kses_post(
												paginate_links(
													array(
														'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
														'format' => '?paged=%#%',
														'current' => max( 1, get_query_var( 'paged' ) ),
														'total' => $portfolio_query->max_num_pages,
														'prev_text' => '<span class="meta-nav screen-reader-text">' . esc_html__( 'Previous Page', 'portfolio-block-pwp' ) . '</span>&laquo;',
														'next_text' => '<span class="meta-nav screen-reader-text">' . esc_html__( 'Next Page', 'portfolio-block-pwp' ) . '</span>&raquo;',
													)
												)
											);
										?>

									</nav>

								</div>

							<?php } ?>

						<?php } ?>

					<?php endif; ?>
					<?php wp_reset_postdata(); ?>

				<?php /** END .pwp-block */ ?>
				</div>

			<?php
				return ob_get_clean();
		} //End of render html function
	} //End of class
} // End of if conditional
?>
