photosGallery.controller('RootController', ['$scope', '$state', '$rootScope',
			function($scope, $state, $rootScope){
                
                $rootScope.accessLog = new Array();
				
				$rootScope.$on('$stateChangeStart', 
				function(event, toState, toParams, fromState, fromParams){
					
					if(toState.data.required && !$rootScope.user){
						event.preventDefault();
						$state.go('content.login');
						return;
					}	
					
				});
                
                $rootScope.$on('$stateNotFound', 
                function(event, unfoundState, fromState, fromParams){
                    event.preventDefault();
                    $state.go('content.notfound');
                });
                
                $rootScope.$on('$stateChangeSuccess', 
                function(event, toState, toParams, fromState, fromParams){
                     $rootScope.accessLog.push({
                         user: $rootScope.user,
                         from: fromState.name,
                         to: toState.name,
                         date: new Date()
                     });
                });
				
				$rootScope.$on('$stateChangeError', 
				function(event, toState, toParams, fromState, fromParams, error){
					event.preventDefault();
					$state.go('content.error', {error: error});
				});
				
			}
]);

photosGallery.controller('HomeController', ['$scope', '$state',
			function($scope, $state){
				this.message = 'Welcome to the Photo Gallery';
			}
]);

photosGallery.controller('PhotoController', ['$scope', '$state', 
			function($scope, $state){
			
				this.photos = [
					{ id: 0, title: 'Photo 1', description: 'description for photo 1', imageName: 'image1.JPG', comments:[
						{ name:'User1', comment: 'Nice', imageName: 'man.png'},
						{ name:'User2', comment:'Very good', imageName: 'man.png'},
						{ name:'User3', comment:'Nice', imageName: 'woman.png'},
						{ name:'User4', comment:'Very good', imageName: 'woman.png'},
						{ name:'User5', comment:'Very good', imageName: 'man.png'},
						{ name:'User6', comment:'Nice', imageName: 'woman.png'},
						{ name:'User7', comment:'So so', imageName: 'man.png'}
					]},
					{ id: 1, title: 'Photo 2', description: 'description for photo 2', imageName: 'image2.JPG', comments:[
						{ name:'User1', comment: 'Nice', imageName: 'man.png'},
						{ name:'User2', comment:'Very good', imageName: 'man.png'},
						{ name:'User3', comment:'Nice', imageName: 'woman.png'},
						{ name:'User4', comment:'Very good', imageName: 'woman.png'}
					]},
					{ id: 2, title: 'Photo 3', description: 'description for photo 3', imageName: 'image3.JPG', comments:[ 
						{ name:'User1', comment: 'Nice', imageName: 'man.png'},
						{ name:'User2', comment:'Very good', imageName: 'man.png'},
						{ name:'User3', comment:'Nice', imageName: 'woman.png'},
						{ name:'User4', comment:'Very good', imageName: 'woman.png'},
						{ name:'User5', comment:'Very good', imageName: 'man.png'},
						{ name:'User6', comment:'Nice', imageName: 'woman.png'},
						{ name:'User7', comment:'So so', imageName: 'man.png'}
					]},
					{ id: 3, title: 'Photo 4', description: 'description for photo 4', imageName: 'image4.JPG', comments:[
						{ name:'User6', comment:'Nice', imageName: 'woman.png'},
						{ name:'User7', comment:'So so', imageName: 'man.png'}
					]}
				];
				
				this.pullData = function(){
					$scope.$$childTail.ctrPhotoList.photos = this.photos;
				}
			
			}
]);

photosGallery.controller('PhotoListController', ['$scope', '$state', 
			function($scope, $state){
				
				this.reading = false;
				this.photos = new Array();
				
				this.init = function(){
					this.reading = true;
					setTimeout(function(){
						$scope.$apply(function(){
							$scope.ctrPhotoList.getData();
						});
					}, 1500);
				}
				
				this.getData = function(){
					
					$scope.$parent.ctrPhoto.pullData();
				
					/*this.photos = $scope.$parent.ctrPhoto.photos;*/
					this.reading = false;
					
				}
			
			}
]);

photosGallery.controller('PhotoDetailController', ['$scope', '$state', '$stateParams', 
			function($scope, $state, $stateParams){
			
				var id = null;
				this.photo = null;
				this.viewObj = null;
				this.init = function(){
					id = parseInt($stateParams.id);
					this.photo = $scope.ctrPhoto.photos[id];
					this.viewObj = JSON.parse(sessionStorage.getItem($stateParams.id));
				}
				
			}
]);

photosGallery.controller('PhotoCommentController', ['$scope', '$state', '$stateParams',
			function($scope, $state, $stateParams){
				var id, skip, limit = null;
				this.comments = new Array();
				
				this.init = function(){
					id = parseInt($stateParams.id);
					var photo = $scope.ctrPhoto.photos[id];
					
					
					if($stateParams.skip){
						skip = parseInt($stateParams.skip);
					}else{
						skip = 0;
					}
					
					if($stateParams.limit){
						limit = parseInt($stateParams.limit);
					}else{
						limit = photo.comments.length;
					}
					
					this.comments = photo.comments.slice(skip, limit);
				
				}
			}												   
]);
