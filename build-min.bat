java -jar node_modules/google-closure-compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js bower_components/closure-library/closure/**.js --js src/*/**.js --js src/odd.js --dependency_mode=STRICT --entry_point=goog:odd --js_output_file odd-min.js