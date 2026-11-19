"use client";

import React, { useState } from "react";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tamiul.dev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <div className="DxRQVq6M">
        <div aria-hidden="true" className="oDlRct6k">
          <div className="pqpIBwim container">
            <div className="puBGkXbv i8FqydUI HpfpfkkS">
              <span aria-hidden="true" className="OtybCf2U size-[5px] m7aWZARZ" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] SdCAH6sp" data-node="top"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] vgoN9Yn8" data-node="bottom"></span>
              <span aria-hidden="true" className="OtybCf2U size-[5px] OpiMbwgW" data-node="bottom"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="EQJ6BC3A">
        <footer className="Z341Qab9 xrLR9pDo">
          <div className="pqpIBwim container">
            <div className="AUnucuLw g4ZzFJT4">
              <div className="ywaDPv7D">
                <nav aria-label="Footer" className="GghwukIc group/footnav">
                  <div className="CAP6NKMI">
                    <h2 className="Gv2OM6nW">Work</h2>
                    <ul className="VL4VcoNx">
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/projects">Projects</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/blog">Blog</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/about">About</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/uses">Uses</a></li>
                    </ul>
                  </div>
                  <div className="CAP6NKMI">
                    <h2 className="Gv2OM6nW">Site</h2>
                    <ul className="VL4VcoNx">
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/guestbook">Guestbook</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/bucket-list">Bucket List</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/links">Links</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" href="/contact">Contact</a></li>
                    </ul>
                  </div>
                  <div className="CAP6NKMI">
                    <h2 className="Gv2OM6nW">Social</h2>
                    <ul className="VL4VcoNx">
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" rel="noopener noreferrer" target="_blank" href="https://github.com/tamim127">GitHub</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" rel="noopener noreferrer" target="_blank" href="https://linkedin.com/in/tamiulalam">LinkedIn</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" rel="noopener noreferrer" target="_blank" href="https://x.com/tamiulalam">X</a></li>
                      <li><a className="NXYTRSZD" data-cuelume-navigate="select" rel="noopener noreferrer" target="_blank" href="https://wa.me/8801833866581">WhatsApp</a></li>
                    </ul>
                  </div>
                </nav>
                <div className="LcNeN5ll">
                  <dl className="OCPCGOwF">
                    <div className="B10ibJY9">
                      <dt className="rvJuCjAe">Local time</dt>
                      <dd className="p5Tlm9s3">
                        <span className="xlmPJCsR">—</span> BST · Remote, Bangladesh
                      </dd>
                    </div>
                    <div className="B10ibJY9">
                      <dt className="rvJuCjAe">Email</dt>
                      <dd>
                        <button className="bBa4eVyV group/email" type="button" onClick={handleCopyEmail}>
                          {copiedEmail ? "Copied!" : "tamiul.dev@gmail.com"}
                          <span aria-live="polite" className="D9irom6X">
                            {copiedEmail ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" className="size-3.5 text-emerald-400">
                                <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" aria-label="Copy email" className="size-3.5">
                                <path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z" />
                              </svg>
                            )}
                          </span>
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="bm4XYkpm">
                <p>© 2026 Tamiul Alam</p>
                <div className="jTnYnyvn">
                  <ul className="TA5kDcdo">
                    <li><a className="dpCZRzig" href="/legal/privacy">Privacy</a></li>
                    <li><a className="dpCZRzig" href="/legal/terms">Terms</a></li>
                    <li><a className="dpCZRzig" href="/sitemap.xml">Sitemap</a></li>
                    <li><a className="dpCZRzig" href="/blog/rss.xml">RSS</a></li>
                    <li><a className="dpCZRzig" href="/llms.txt">llms.txt</a></li>
                    <li><a className="dpCZRzig" href="/agents.md">agents.md</a></li>
                  </ul>
                  <div aria-label="Theme" className="FUk5s7OB" role="group">
                    <button aria-label="Light theme" aria-pressed="false" className="VVl8R4aB size-7" title="Light theme" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M116,36V20a12,12,0,0,1,24,0V36a12,12,0,0,1-24,0Zm80,92a68,68,0,1,1-68-68A68.07,68.07,0,0,1,196,128Zm-24,0a44,44,0,1,0-44,44A44.05,44.05,0,0,0,172,128ZM51.51,68.49a12,12,0,1,0,17-17l-12-12a12,12,0,0,0-17,17Zm0,119-12,12a12,12,0,0,0,17,17l12-12a12,12,0,1,0-17-17ZM196,72a12,12,0,0,0,8.49-3.51l12-12a12,12,0,0,0-17-17l-12,12A12,12,0,0,0,196,72Zm8.49,115.51a12,12,0,0,0-17,17l12,12a12,12,0,0,0,17-17ZM48,128a12,12,0,0,0-12-12H20a12,12,0,0,0,0,24H36A12,12,0,0,0,48,128Zm80,80a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,128,208Zm108-92H220a12,12,0,0,0,0,24h16a12,12,0,0,0,0-24Z" /></svg>
                    </button>
                    <button aria-label="System theme" aria-pressed="false" className="VVl8R4aB size-7" title="System theme" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M208,36H48A28,28,0,0,0,20,64V172a28,28,0,0,0,28,28h68v12H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24H140V200h68a28,28,0,0,0,28-28V64A28,28,0,0,0,208,36ZM48,60H208a4,4,0,0,1,4,4v72H44V64A4,4,0,0,1,48,60ZM208,176H48a4,4,0,0,1-4-4V160H212v12A4,4,0,0,1,208,176Z" /></svg>
                    </button>
                    <button aria-label="Dark theme" aria-pressed="false" className="VVl8R4aB size-7" title="Dark theme" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="HyBIGs4O">
                <div className="auti4JUh">
                  <span className="zAElfINb" style={{"--i":"0"} as React.CSSProperties}>T</span>
                  <span className="zAElfINb" style={{"--i":"1"} as React.CSSProperties}>a</span>
                  <span className="zAElfINb" style={{"--i":"2"} as React.CSSProperties}>m</span>
                  <span className="zAElfINb" style={{"--i":"3"} as React.CSSProperties}>i</span>
                  <span className="zAElfINb" style={{"--i":"4"} as React.CSSProperties}>u</span>
                  <span className="zAElfINb" style={{"--i":"5"} as React.CSSProperties}>l</span>
                  <span className="zAElfINb" style={{"--i":"6"} as React.CSSProperties}> </span>
                  <span className="zAElfINb" style={{"--i":"7"} as React.CSSProperties}>A</span>
                  <span className="zAElfINb" style={{"--i":"8"} as React.CSSProperties}>l</span>
                  <span className="zAElfINb" style={{"--i":"9"} as React.CSSProperties}>a</span>
                  <span className="zAElfINb" style={{"--i":"10"} as React.CSSProperties}>m</span>
                  <span hidden={true}></span>
                </div>
              </div>
              <div aria-hidden="true" className="CZVYHBgA"></div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
