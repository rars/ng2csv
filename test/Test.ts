// require all files ending in '.spec.ts' from the
// current directory and all subdirectories
const testsContext = (require as any).context('.', true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);
