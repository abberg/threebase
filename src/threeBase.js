var ab = ab || {};

ab.threeBase = function(config) {

    config = config || {};

    var aspectRatio = config.aspectRatio || 2.22222,
        clearColor  = config.clearColor  || 0x090909,
        cameraFov   = config.cameraFov   || 70, 
        cameraNear  = config.cameraNear  || 0.1, 
        cameraFar   = config.cameraFar   || 1000,

        scene = new THREE.Scene(),
        camera = new THREE.PerspectiveCamera( cameraFov, aspectRatio, cameraNear, cameraFar ),
        renderer = new THREE.WebGLRenderer(),
        mesh,

        init = function(){
            
            document.body.appendChild( renderer.domElement );

            renderer.setClearColor(clearColor);

            window.addEventListener('resize', onWindowResize);
        
        },

        setup = config.setup || function(){
            
            var geometry = new THREE.BoxGeometry( 1, 1, 1 ),
                material = new THREE.MeshLambertMaterial( { color: 0xffffff } ),
                directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ),
                ambientLight = new THREE.AmbientLight( 0x222222 ); // soft white light
          
            directionalLight.position.set( 0, 1, 0 );
            scene.add( directionalLight );

            scene.add( ambientLight );

            mesh = new THREE.Mesh( geometry, material );
            scene.add( mesh );

            camera.position.z = 5;
        },

        update = config.update || function(){
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
        },

        render = function(){
            renderer.render(scene, camera);
        },

        onFrame = function(){
            requestAnimationFrame( onFrame );
            update();
            render();
        },

        onWindowResize = function(){
            
            var width = window.innerWidth,
                height = width / aspectRatio;

            if(height > window.innerHeight){
                height = window.innerHeight;
            }

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            renderer.setSize( width, height );

        };
    
    init();
    onWindowResize();
    
    return {
        scene: scene,
        camera: camera,
        renderer: renderer,
        start: function(){
            setup();
            onFrame();
        }
    };

};