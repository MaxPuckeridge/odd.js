java -jar node_modules/google-closure-compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js bower_components/closure-library/closure/**.js --js odd/*/**.js --js odd/odd.js --dependency_mode=STRICT --entry_point=goog:odd --js_output_file lib/min/odd-min.js