function UploadPreview({ onUpload }) {
  function handleUpload(event) {
    const files = Array.from(event.target.files || []);
    if (files.length) {
      onUpload(files);
    }
    event.target.value = '';
  }

  return (
    <section className="upload-panel fade-in-up">
      <label htmlFor="upload-input" className="upload-label">
        Upload Preview Images
      </label>
      <input
        id="upload-input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
      />
      <p>Frontend-only preview. Files are not sent to any server.</p>
    </section>
  );
}

export default UploadPreview;
