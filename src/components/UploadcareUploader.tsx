import React, { useCallback, useEffect, useRef, useState } from "react";

import * as LR from "@uploadcare/blocks";
import { PACKAGE_VERSION } from "@uploadcare/blocks/env";

import "./UploadcareUploader.css";

LR.registerBlocks(LR);

const UploadcareUploader = () => {
  // const dataOutputRef = useRef<LR.DataOutput>();
  const [files, setFiles] = useState<any[]>([]);
  const dataOutputRef = useRef<HTMLOutputElement>(null);

  const handleUploaderEvent = useCallback((e: CustomEvent<any>) => {
    const { data } = e.detail;
    setFiles(data);
  }, []);

  useEffect(() => {
    const el = dataOutputRef.current;

    el?.addEventListener(
      "lr-data-output",
      handleUploaderEvent as EventListenerOrEventListenerObject
    );
    return () => {
      el?.removeEventListener(
        "lr-data-output",
        handleUploaderEvent as EventListenerOrEventListenerObject
      );
    };
  }, [handleUploaderEvent]);

  return (
    <section
      style={
        {
          "--uploadcare-pubkey": `"${import.meta.env.VITE_UPLOADCARE_API_KEY}"`,
        } as React.CSSProperties
      }
    >
      <lr-file-uploader-regular
        class="uploaderCfg"
        css-src={`https://unpkg.com/@uploadcare/blocks@${PACKAGE_VERSION}/web/file-uploader-regular.min.css`}
      >
        <lr-data-output
          ref={dataOutputRef}
          use-event
          hidden
          class="uploaderCfg"
          onEvent={handleUploaderEvent}
        ></lr-data-output>
      </lr-file-uploader-regular>

      <div className="img-gallery">
        {files.map((file) => (
          <img
            key={file.uuid}
            src={file.cdnUrl}
            alt="Preview"
            className="img-preview"
          />
        ))}
      </div>
    </section>
  );
};

export default UploadcareUploader;