angular.module("your_app_name.views", []).run(["$templateCache", function($templateCache) {$templateCache.put("views/app/bookmarks.html","<ion-view class=\"bookmarks-view\">\n  <ion-nav-title>\n    <span>Bookmarks</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"row bookmarks-container\">\n      <div ng-if=\"bookmarks.length == 0\" class=\"col col-center\">\n        <div class=\"empty-results\">\n          <i class=\"icon ion-bookmark\"></i>\n          <h3 class=\"no-bookmarks\">There\'s nothing here yet. Start exploring!</h3>\n        </div>\n      </div>\n      <div ng-if=\"bookmarks.length > 0\" class=\"col\">\n        <ion-list class=\"bookmarks-list\" can-swipe=\"true\">\n          <ion-item class=\"bookmark-item\" ng-repeat=\"bookmark in bookmarks\">\n            <a ui-sref=\"app.post({postId : bookmark.id})\">\n              <h2 class=\"post-title\" ng-bind-html=\"bookmark.title | rawHtml\"></h2>\n              <p class=\"post-date\">Posted <span class=\"post-time\" am-time-ago=\"bookmark.date\"></span></p>\n            </a>\n            <ion-option-button class=\"remove-button\" ng-click=\"remove(bookmark.id)\">Remove</ion-option-button>\n          </ion-item>\n        </ion-list>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/contact.html","<ion-view class=\"contact-view\">\n  <ion-nav-title>\n    <span>Contact</span>\n  </ion-nav-title>\n  <ion-content>\n    <div>\n      <map data-tap-disabled=\"true\" center=\"{{position.lat}},{{position.lng}}\" zoom=\"15\" disable-default-u-i=\"true\">\n        <marker\n          position=\"{{position.lat}},{{position.lng}}\"\n          title=\"Hello Marker\"\n          visible=\"true\">\n        </marker>\n      </map>\n    </div>\n    <div class=\"contact-content\">\n      <div class=\"\">\n        <p>\n          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n        </p>\n        <p>\n          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,\n          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto\n          beatae vitae dicta sunt explicabo.\n        </p>\n      </div>\n      <div class=\"contact-details-item\">\n        <h4>Address</h4>\n        <div class=\"featured\">Our Inc.</div>\n        <div>2283 Monroe Drive</div>\n        <div>Rochester, NY 14606</div>\n      </div>\n      <div class=\"contact-details-item\">\n        <h4>Social Networks</h4>\n        <div class=\"row social-networks\" dynamic-anchor-fix>\n          <div class=\"col\"><a href=\"http://twitter.com\"><i class=\"icon ion-social-twitter twitter-icon\"></i></a></div>\n          <div class=\"col\"><a href=\"http://facebook.com\"><i class=\"icon ion-social-facebook facebook-icon\"></i></a></div>\n          <div class=\"col\"><a href=\"http://dribbble.com\"><i class=\"icon ion-social-dribbble dribbble-icon\"></i></a></div>\n          <div class=\"col\"><a href=\"http://google.com\"><i class=\"icon ion-social-rss rss-icon\"></i></a></div>\n          <div class=\"col\"><a href=\"http://pinterest.com\"><i class=\"icon ion-social-pinterest pinterest-icon\"></i></a></div>\n        </div>\n      </div>\n      <div class=\"send-email\">\n        <button class=\"button button-outline button-block featured\" ng-controller=\"EmailSenderCtrl\" ng-click=\"sendContactMail()\">\n          Send us an email\n        </button>\n      </div>\n\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/home.html","<ion-view class=\"home-view\">\n  <ion-nav-title>\n    <span>Recent posts</span>\n  </ion-nav-title>\n  <ion-content>\n\n    <!-- Refresh to get the new posts -->\n    <ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=\"doRefresh()\">\n    </ion-refresher>\n\n    <div class=\"posts\">\n      <div post-card ng-repeat=\"post in posts\" class=\"post-card\"></div>\n    </div>\n\n    <!-- Infinit scroll -->\n    <ion-infinite-scroll ng-if=\"moreDataCanBeLoaded()\" on-infinite=\"loadMoreData()\" distance=\"1%\">\n    </ion-infinite-scroll>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/settings.html","<ion-view class=\"settings-view\">\n  <ion-nav-buttons side=\"left\">\n    <button menu-toggle=\"left\" class=\"button button-icon icon ion-navicon\"></button>\n  </ion-nav-buttons>\n  <ion-nav-title>\n    <span>Settings</span>\n  </ion-nav-title>\n  <ion-content>\n    <ul class=\"list\">\n\n      <ion-toggle ng-model=\"notifications\" toggle-class=\"toggle-dark\">Push Notifications</ion-toggle>\n      <ion-toggle ng-model=\"sendLocation\" toggle-class=\"toggle-dark\">Send Location</ion-toggle>\n\n      <div class=\"item item-divider\">OPTIONS</div>\n      <a class=\"item option\" ng-controller=\"EmailSenderCtrl\" ng-click=\"sendFeedback()\">\n        <i class=\"icon ion-chatbox dark\"></i>\n        <span class=\"title\">Send feedback</span>\n      </a>\n      <a class=\"item option\" ng-controller=\"RateAppCtrl\" ng-click=\"rateApp()\">\n        <i class=\"icon ion-heart assertive\"></i>\n        <span class=\"title\">Rate this app</span>\n      </a>\n      <a class=\"item option\" ng-controller=\"AdmobCtrl\" ng-click=\"manageAdMob()\">\n        <i class=\"icon ion-social-usd\"></i>\n        <span class=\"title\">AdMob</span>\n      </a>\n      <a class=\"item option\" ng-controller=\"iAdCtrl\" ng-click=\"manageiAd()\">\n        <i class=\"icon ion-social-usd\"></i>\n        <span class=\"title\">iAd</span>\n      </a>\n\n      <div class=\"item item-divider\">LEGAL</div>\n\n      <a class=\"item\" href=\"\" ng-click=\"showTerms()\">Terms of Service</a>\n      <a class=\"item\" href=\"\" ng-click=\"showFAQS()\">FAQS</a>\n      <a class=\"item\" href=\"\" ng-click=\"showCredits()\">Credits</a>\n\n      <div class=\"item item-divider\">ACCOUNT</div>\n      <a class=\"item option\" ng-click=\"showLogOutMenu()\">\n        <i class=\"icon ion-power\"></i>\n        <span class=\"title\">Log out</span>\n      </a>\n\n    </ul>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/side-menu.html","<ion-side-menus enable-menu-with-back-views=\"false\">\n  <ion-side-menu-content class=\"post-size-14px\">\n    <ion-nav-bar class=\"bar app-top-bar\">\n      <ion-nav-back-button>\n      </ion-nav-back-button>\n      <ion-nav-buttons side=\"left\">\n        <button class=\"button button-icon button-clear ion-navicon\" menu-toggle=\"left\">\n        </button>\n      </ion-nav-buttons>\n      <ion-nav-buttons side=\"right\">\n        <button class=\"button button-icon button-clear ion-search\" menu-toggle=\"right\">\n        </button>\n      </ion-nav-buttons>\n    </ion-nav-bar>\n    <ion-nav-view name=\"menuContent\"></ion-nav-view>\n  </ion-side-menu-content>\n\n  <ion-side-menu class=\"main-menu\" side=\"left\" width=\"230\">\n    <ion-content>\n      <ion-list>\n        <ion-item class=\"heading-item item\" nav-clear menu-close ui-sref=\"app.settings\">\n          <pre-img ratio=\"_1_1\">\n            <img class=\"user-image\" ng-src=\"{{user.avatar}}\" spinner-on-load>\n          </pre-img>\n          <div class=\"heading-bg\">\n          </div>\n          <div class=\"heading-action item-icon-left\">\n            <i class=\"icon ion-gear-a\"></i>\n            <h2 class=\"greeting\">My settings</h2>\n          </div>\n        </ion-item>\n        <ion-item class=\"item item-icon-left\" nav-clear menu-close ui-sref=\"app.home\">\n          <i class=\"icon ion-quote\"></i>\n          <h2 class=\"menu-text\">Recent posts</h2>\n        </ion-item>\n        <ion-item class=\"item item-icon-left\" nav-clear menu-close ui-sref=\"app.bookmarks\">\n          <i class=\"icon ion-bookmark\"></i>\n          <h2 class=\"menu-text\">Saved for later</h2>\n        </ion-item>\n        <ion-item class=\"item item-icon-left\" nav-clear menu-close ui-sref=\"app.page\">\n          <i class=\"icon ion-social-wordpress\"></i>\n          <h2 class=\"menu-text\">Wordpress Page</h2>\n        </ion-item>\n        <ion-item class=\"item item-icon-left\" nav-clear menu-close ui-sref=\"app.contact\">\n          <i class=\"icon ion-location\"></i>\n          <h2 class=\"menu-text\">Contact</h2>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  </ion-side-menu>\n\n  <ion-side-menu class=\"multi-level-push-menu\" side=\"right\" ng-controller=\"PushMenuCtrl\">\n    <ion-content has-bouncing=\"false\" scroll=\"false\">\n      <wp-search>\n      </wp-search>\n      <push-menu menu=\"menu\"></push-menu>\n    </ion-content>\n  </ion-side-menu>\n</ion-side-menus>\n");
$templateCache.put("views/auth/forgot-password.html","<ion-view class=\"forgot-password-view\">\n  <ion-nav-bar class=\"view-navigation\">\n    <ion-nav-back-button>\n    </ion-nav-back-button>\n  </ion-nav-bar>\n  <ion-content class=\"padding\">\n    <div class=\"row form-heading\">\n      <div class=\"col col-center\">\n        <h1 class=\"form-title\">Recover your password</h1>\n      </div>\n    </div>\n    <div class=\"row form-wrapper\">\n      <div class=\"col\">\n        <form name=\"forgot_password_form\" class=\"\" novalidate>\n          <div class=\"list input-fields\">\n            <label class=\"item item-input\">\n              <span class=\"input-label\">Username</span>\n              <input type=\"text\" name=\"user_name\" ng-model=\"user.userName\" required>\n            </label>\n            <button type=\"submit\" class=\"recover button button-positive button-block\" ng-click=\"recoverPassword()\" ng-disabled=\"forgot_password_form.$invalid\">\n              Recover it\n            </button>\n            <p ng-show=\"error\" class=\"message error\">{{error}}</p>\n            <p ng-show=\"message\" class=\"message\">{{message}}</p>\n          </div>\n        </form>\n        <div class=\"alternative-actions\">\n          <a class=\"log-in button button-small button-clear\" ui-sref=\"login\">\n            Log In\n          </a>\n          <a class=\"sign-up button button-small button-clear\" ui-sref=\"register\">\n            Sign Up\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/login.html","<ion-view class=\"login-view\">\n  <ion-nav-bar class=\"view-navigation\">\n    <ion-nav-back-button>\n    </ion-nav-back-button>\n  </ion-nav-bar>\n  <ion-content class=\"padding\">\n    <div class=\"row form-heading\">\n      <div class=\"col col-center\">\n        <h1 class=\"form-title\">Welcome back</h1>\n      </div>\n    </div>\n    <div class=\"row form-wrapper\">\n      <div class=\"col\">\n        <form name=\"login_form\" class=\"\" novalidate>\n          <div class=\"list input-fields\">\n            <label class=\"item item-input\">\n              <span class=\"input-label\">Username</span>\n              <input type=\"text\" name=\"user_name\" ng-model=\"user.userName\" required>\n            </label>\n            <label class=\"item item-input\" show-hide-container>\n              <span class=\"input-label\">Password</span>\n              <input type=\"password\" name=\"password\" ng-model=\"user.password\" required show-hide-input>\n            </label>\n            <button type=\"submit\" class=\"login button button-block\" ng-click=\"doLogin()\" ng-disabled=\"login_form.$invalid\">\n              Log in\n            </button>\n            <p ng-show=\"error\" class=\"message error\">{{error}}</p>\n          </div>\n        </form>\n        <div class=\"alternative-actions\">\n          <a class=\"forgot-password button button-small button-clear\" ui-sref=\"forgot_password\">\n            Forgot Password?\n          </a>\n          <a class=\"sign-up button button-small button-clear\" ui-sref=\"register\">\n            Sign Up\n          </a>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/register.html","<ion-view class=\"register-view\">\n  <ion-nav-bar class=\"view-navigation\">\n    <ion-nav-back-button>\n    </ion-nav-back-button>\n  </ion-nav-bar>\n  <ion-content class=\"padding\">\n    <div class=\"row form-heading\">\n      <div class=\"col col-center\">\n        <h1 class=\"form-title\">Create your account</h1>\n      </div>\n    </div>\n    <div class=\"row form-wrapper\">\n      <div class=\"col\">\n        <form name=\"signup_form\" class=\"\" novalidate>\n          <div class=\"list input-fields\">\n            <label class=\"item item-input\">\n              <span class=\"input-label\">Username</span>\n              <input type=\"text\" name=\"user_name\" ng-model=\"user.userName\" required>\n            </label>\n            <label class=\"item item-input\">\n              <span class=\"input-label\">Name</span>\n              <input type=\"text\" name=\"display_name\" ng-model=\"user.displayName\" required>\n            </label>\n            <label class=\"item item-input\">\n              <span class=\"input-label\">Email</span>\n              <input type=\"email\" name=\"email\" ng-model=\"user.email\" required>\n            </label>\n            <label class=\"item item-input\" show-hide-container>\n              <span class=\"input-label\">Password</span>\n              <input type=\"password\" name=\"password\" ng-model=\"user.password\" required show-hide-input>\n            </label>\n            <button type=\"submit\" class=\"register button button-block\" ng-click=\"doRegister()\" ng-disabled=\"signup_form.$invalid\">\n              Register\n            </button>\n            <p ng-show=\"error\" class=\"message error\">{{error}}</p>\n          </form>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/auth/walkthrough.html","<ion-view class=\"walkthrough-view\" cache-view=\"false\">\n  <ion-content scroll=\"false\">\n    <div class=\"top-content row\">\n      <ion-slide-box delegate-handle=\"walkthrough-slider\" show-pager=\"true\">\n        <ion-slide>\n          <div class=\"row slide-content\">\n            <div class=\"col\">\n              <h3 class=\"slide-h\">A FULL WordPress integration app</h3>\n              <img class=\"slide-image\" ng-src=\"img/wordpress_logo_white.png\"/>\n              <p class=\"slide-p\">\n                Super easy to configure, try it now!\n              </p>\n            </div>\n          </div>\n        </ion-slide>\n        <ion-slide>\n          <div class=\"row slide-content\">\n            <div class=\"col\">\n              <h3 class=\"slide-h\">All under a beautifull design</h3>\n              <img class=\"slide-image\" ng-src=\"img/ionic_logo_white.png\"/>\n            </div>\n          </div>\n        </ion-slide>\n      </ion-slide-box>\n    </div>\n    <div class=\"bottom-content row\">\n      <div class=\"col col-center\">\n        <a class=\"login button button-block\" ui-sref=\"login\">\n          Log In\n        </a>\n      </div>\n      <div class=\"col col-center\">\n        <a class=\"sign-up button button-block\" ui-sref=\"register\">\n          Register\n        </a>\n      </div>\n    </div>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/common/credits.html","<ion-modal-view>\n	<ion-header-bar>\n		<h1 class=\"title\">Credits</h1>\n		<div class=\"button button-clear\" ng-click=\"credits_modal.hide()\"><span class=\"icon ion-close\"></span></div>\n	</ion-header-bar>\n	<ion-content>\n		<div class=\"credits\">\n			<p>Thanks for using our products and services (“Services”). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n		</div>\n	</ion-content>\n</ion-modal-view>\n");
$templateCache.put("views/common/faqs.html","<ion-modal-view>\n	<ion-header-bar>\n		<h1 class=\"title\">FAQS</h1>\n		<div class=\"button button-clear\" ng-click=\"faqs_modal.hide()\"><span class=\"icon ion-close\"></span></div>\n	</ion-header-bar>\n	<ion-content>\n		<div class=\"faqs\">\n			<ul class=\"list\">\n				<li class=\"faq-item\">\n					<h5>What is Lorem Ipsum?</h5>\n					<p>\n						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n				</li>\n				<li class=\"faq-item\">\n					<h5>Where does it come from?</h5>\n					<p>\n						Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>\n				</li>\n				<li class=\"faq-item\">\n					<h5>Why do we use it?</h5>\n					<p>\n						It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. </p><p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n				</li>\n			</ul>\n		</div>\n	</ion-content>\n</ion-modal-view>\n");
$templateCache.put("views/common/ionic-youtube-video.html","<youtube-video video-id=\"videoId\" player=\"yt_video\" player-vars=\"playerVars\"></youtube-video>\n");
$templateCache.put("views/common/main-menu.html","<div class=\"menu-wrapper\">\n	<nav class=\"mp-menu\">\n		<menu-level menu=\"menu\" level=\"0\"></menu-level>\n	</nav>\n</div>\n");
$templateCache.put("views/common/my-tab.html","<div class=\"tab-content\" ng-show=\"selected\">\n	<ng-transclude></ng-transclude>\n	<div class=\"search-resume\">\n		<div ng-show=\"!query\">\n			<h2 class=\"no-query\">There\'s no query to search</h2>\n		</div>\n		<div ng-show=\"query\">\n			<h2 class=\"search-query\">Searching for: <span class=\"query-text\">{{ query }}</span></h2>\n		</div>\n	</div>\n	<div class=\"search-results-container\">\n		<div ng-show=\"results.length == 0 && query\">\n			<h2 class=\"no-results\">No results</h2>\n		</div>\n		<ul class=\"search-results-list\" ng-if=\"results.length > 0\">\n			<li class=\"search-result-item\" ng-repeat=\"result in results\">\n				<a menu-close ng-click=\"goToPost(result)\">\n					<h2 class=\"post-title\" ng-bind-html=\"result.title | rawHtml\"></h2>\n					<p class=\"post-date\">Posted <span class=\"post-time\" am-time-ago=\"result.date\"></span></p>\n				</a>\n			</li>\n		</ul>\n	</div>\n</div>\n");
$templateCache.put("views/common/pre-img.html","<div class=\"pre-img {{ratio}} {{ helperClass }}\" ng-class=\"{ \'finish-loading\': loaded }\">\n	<ion-spinner ng-show=\"!loaded\" class=\"spinner-on-load\"></ion-spinner>\n	<!-- <span ng-show=\"!loaded\" class=\"spinner-on-load ion-load-c\"></span> -->\n	<ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("views/common/show-hide-password.html","<div class=\"show-hide-input\" ng-transclude>\n</div>\n<a class=\"toggle-view-anchor\" on-touch=\"toggleType($event)\">\n	<span ng-show=\"show\">HIDE</span>\n	<span ng-show=\"!show\">SHOW</span>\n</a>\n");
$templateCache.put("views/common/terms.html","<ion-modal-view>\n	<ion-header-bar>\n		<h1 class=\"title\">Terms of Service</h1>\n		<div class=\"button button-clear\" ng-click=\"terms_modal.hide()\"><span class=\"icon ion-close\"></span></div>\n	</ion-header-bar>\n	<ion-content>\n		<div class=\"terms-of-service\">\n			<p>Last modified: April 14, 2014</p>\n			<h4 class=\"title\">Welcome to ionWordpress!</h4>\n			<p>Thanks for using our products and services (“Services”). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n			<h4 class=\"title\">Using our Services</h4>\n			<p>You must follow any policies made available to you within the Services.</p>\n			<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n			<h4 class=\"title\">About these Terms</h4>\n			<p>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly. We’ll post notice of modifications to these terms on this page. We’ll post notice of modified additional terms in the applicable Service. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a Service or changes made for legal reasons will be effective immediately. If you do not agree to the modified terms for a Service, you should discontinue your use of that Service.</p>\n		</div>\n	</ion-content>\n</ion-modal-view>\n");
$templateCache.put("views/app/search/menu-level.html","<div class=\"mp-level\" ng-class=\"{\'mp-level-overlay\': menu.overlay, \'level-id-{{menu.id}}\':true}\">\n	<div class=\"menu-heading\" ng-class=\"{\'has-previous\': level > 0}\">\n		<a class=\"menu-title\" ng-if=\"level > 0\" menu-close ui-sref=\"app.category({categoryTitle: menu.title, categoryId: menu.id})\">\n			<h2 class=\"title-text\">{{menu.title}}</h2>\n			<span class=\"title-aux\">see all</span>\n		</a>\n		<a class=\"menu-title\" ng-if=\"level == 0\" href=\"\">\n			<h2 class=\"title-text\">{{menu.title}}</h2>\n		</a>\n		<a ng-if=\"level > 0\" class=\"menu-back icon ion-chevron-left\" ng-click=\"backToPreviousMenu(menu, $event)\">back</a>\n	</div>\n	<ul class=\"categories-list\">\n		<li ng-repeat=\"item in menu.items\" class=\"category-item-container icon\" ng-class=\"{\'ion-chevron-right\': item.menu}\">\n			<div class=\"category-item\" ng-if=\"item.menu\">\n				<a class=\"category-details\" ng-click=\"openSubMenu(item.menu, menu, $event)\" href=\"\">\n					<span class=\"category-title\">{{ item.name }}</span>\n					<p class=\"category-description\">\n						{{item.description}}\n					</p>\n				</a>\n				<recursive-menu>\n					<menu-level menu=\"item.menu\" level=\"childrenLevel\"></menu-level>\n				</recursive-menu>\n			</div>\n			<div class=\"category-item\" ng-if=\"!item.menu\">\n				<a menu-close class=\"category-details\" ui-sref=\"app.category({categoryTitle: item.name, categoryId: item.id})\">\n					<span class=\"category-title\">{{ item.name }}</span>\n					<p class=\"category-description\">\n						{{item.description}}\n					</p>\n				</a>\n			</div>\n		</li>\n	</ul>\n</div>\n");
$templateCache.put("views/app/search/search-results.html","<div class=\"search-results-wrapper\">\n	<div class=\"item item-divider results-heading\">\n		<div class=\"tabs-striped tabs-background-dark tabs-color-stable\">\n			<div class=\"tabs\">\n				<a ng-repeat=\"tab in tabs\" ng-click=\"select(tab)\" ng-class=\"{ active: tab.selected }\" class=\"tab-item\">{{tab.title}}</a>\n			</div>\n		</div>\n	</div>\n	<div class=\"item item-body results-body\">\n		<div class=\"tabs-content\" ng-transclude></div>\n	</div>\n</div>\n");
$templateCache.put("views/app/search/wp-search.html","<div class=\"wp-search\">\n	<div class=\"search-box-wrapper\">\n		<div class=\"bar bar-header item-input-inset\">\n			<label class=\"item-input-wrapper\">\n				<i class=\"icon ion-search placeholder-icon\"></i>\n				<input type=\"search\" ng-model=\"query\" placeholder=\"Search posts\" search-input>\n			</label>\n			<button ng-click=\"closeSearch($event)\" class=\"button button-clear button-icon icon ion-close-circled\"></button>\n		</div>\n	</div>\n	<search-results>\n		<my-tab title=\"Posts\" tabid=\"posts\" query=\"{{query}}\">\n		</my-tab>\n		<my-tab title=\"Tags\" tabid=\"tags\" query=\"{{query}}\">\n		</my-tab>\n		<my-tab title=\"Authors\" tabid=\"authors\" query=\"{{query}}\">\n		</my-tab>\n	</search-results>\n</div>\n");
$templateCache.put("views/app/wordpress/category.html","<ion-view class=\"category-view\">\n  <ion-nav-title>\n    <span>{{category.title}}</span>\n  </ion-nav-title>\n  <ion-content>\n\n    <!-- Refresh to get the new posts -->\n    <ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=\"doRefresh()\">\n    </ion-refresher>\n\n    <div class=\"posts\">\n      <div post-card ng-repeat=\"post in posts\" class=\"post-card\"></div>\n    </div>\n\n    <!-- Infinit scroll -->\n    <ion-infinite-scroll ng-if=\"moreDataCanBeLoaded()\" on-infinite=\"loadMoreData()\" distance=\"1%\" icon=\"ion-loading-c\">\n    </ion-infinite-scroll>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("views/app/wordpress/post-card.html","<div class=\"card-header\">\n  <h1 ng-bind-html=\"post.title | rawHtml\"></h1>\n  <h2>Posted <span am-time-ago=\"post.date\"></span> by <span class=\"author\" ng-bind-html=\"post.author.name | rawHtml\"></span></h2>\n</div>\n<div class=\"card-content-outer\" post-content>\n  <div class=\"card-content\" dynamic-anchor-fix ng-bind-html=\"post.content | rawHtml\"></div>\n</div>\n<div class=\"card-footer\">\n  <a class=\"card-button secondary\" ng-click=\"sharePost(post.url)\">SHARE</a>\n  <a class=\"card-button primary\" ui-sref=\"app.post({postId :post.id})\">READ MORE</a>\n  <a ng-show=\"post.comment_count > 0\" class=\"card-button comments\" ui-sref=\"app.post({postId :post.id})\">\n    <i class=\"icon ion-chatbox\"></i>{{post.comment_count}}\n  </a>\n  <a class=\"card-button secondary bookmark\" ng-click=\"bookmarkPost(post)\">\n    <i class=\"icon ion-bookmark\"></i>\n  </a>\n</div>\n");
$templateCache.put("views/app/wordpress/post.html","<ion-view class=\"post-view\" cache-view=\"false\">\n  <ion-nav-title>\n    <span ng-bind-html=\"post.title | rawHtml\"></span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"post\" post-content>\n      <div class=\"card-header\">\n        <h1 ng-bind-html=\"post.title | rawHtml\"></h1>\n        <h2>Posted <span am-time-ago=\"post.date\"></span> by <span class=\"author\" ng-bind-html=\"post.author.name | rawHtml\"></span></h2>\n      </div>\n      <div class=\"card-content\" dynamic-anchor-fix ng-bind-html=\"post.content | rawHtml\"></div>\n    </div>\n    <div class=\"post-actions\">\n      <a class=\"card-button primary\" ng-click=\"sharePost(post.url)\">SHARE</a>\n      <span ng-show=\"post.comment_count > 0\" class=\"card-button comment-count\">\n        <i class=\"icon ion-chatbox\"></i>{{post.comment_count}}\n      </span>\n    </div>\n    <div class=\"comments\">\n      <div class=\"list\">\n        <div class=\"item item-avatar\" ng-repeat=\"comment in comments\" ng-class=\"{highlighted: comment.id === new_comment_id}\">\n          <img ng-src=\"{{comment.user_gravatar}}\">\n          <h2  ng-bind-html=\"comment.author.name | rawHtml\"><span class=\"comment-date\" am-time-ago=\"comment.date\"></span></h2>\n          <p class=\"message-content\" ng-bind-html=\"comment.content | rawHtml\"></p>\n        </div>\n      </div>\n    </div>\n  </ion-content>\n  <ion-footer-bar class=\"new-comment post-footer bar bar-footer\">\n    <form name=\"comment_form\" class=\"row\" novalidate>\n      <div class=\"col col-80 content col-center\">\n        <input class=\"new-comment-message\" type=\"text\" placeholder=\"Leave a comment...\" ng-model=\"new_comment\" required></input>\n      </div>\n      <div class=\"col col-20 button-container col-center\">\n        <button class=\"button button-clear send\" type=\"submit\" ng-click=\"addComment()\" ng-disabled=\"comment_form.$invalid\">\n          Send\n        </button>\n      </div>\n    </form>\n  </ion-footer-bar>\n</ion-view>\n");
$templateCache.put("views/app/wordpress/wordpress-page.html","<ion-view class=\"wordpress-page-view\">\n  <ion-nav-title>\n    <span>{{page.title}}</span>\n  </ion-nav-title>\n  <ion-content>\n    <div class=\"page-content-outer\" post-content>\n      <div class=\"page-content\" dynamic-anchor-fix ng-bind-html=\"page.content | rawHtml\"></div>\n    </div>\n  </ion-content>\n</ion-view>\n");}]);