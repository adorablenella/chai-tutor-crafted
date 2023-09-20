const TestPreview = () => (
  <div>
    <iframe title="preview" src={`${window.location.origin}#/page`} className="h-[700px] w-full" />
  </div>
);

export default TestPreview;
