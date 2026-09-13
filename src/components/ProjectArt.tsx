import {
  ArrowRight,
  Database,
  Layers3,
  Code2,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
export default function ProjectArt({ type }: { type: string }) {
  return (
    <div className={`project-art ${type}`} aria-hidden="true">
      <div className="mini-browser">
        <div className="window-bar">
          <i />
          <i />
          <i />
          <span>
            {type === "store"
              ? "moriveda.in"
              : type === "pipeline"
                ? "engine-history / lakehouse"
                : "assumptions / platform"}
          </span>
        </div>
        {type === "pipeline" ? (
          <div className="pipeline-art">
            <div className="pipeline-label">FROM RAW DATA TO REAL INSIGHT</div>
            <div className="data-flow">
              <div>
                <Database />
                <small>BRONZE</small>
              </div>
              <ArrowRight />
              <div>
                <Layers3 />
                <small>SILVER</small>
              </div>
              <ArrowRight />
              <div>
                <Sparkles />
                <small>GOLD</small>
              </div>
            </div>
            <div className="chart-bars">
              {[24, 40, 30, 57, 45, 75, 63, 90, 80, 108, 96, 128].map(
                (h, i) => (
                  <i key={i} style={{ height: h / 1.7 }} />
                ),
              )}
            </div>
          </div>
        ) : type === "backend" ? (
          <div className="backend-art">
            <div className="code-lines">
              <span>
                <b>from</b> fastapi <b>import</b> FastAPI
              </span>
              <span>
                app = <em>FastAPI</em>()
              </span>
              <br />
              <span className="code-dim"># built for production</span>
              <span>
                <b>@app.get</b>("/insights")
              </span>
              <span>
                <b>async def</b> <em>get_insights</em>():
              </span>
              <span>
                　<b>return</b> {"{"}"status": <em>"ready"</em>
                {"}"}
              </span>
            </div>
            <div className="api-status">
              <span /> ALL SYSTEMS OPERATIONAL <Code2 size={18} />
            </div>
          </div>
        ) : (
          <div className="store-art">
            <div className="store-brand">
              moriveda<span>NATURE, IN YOUR EVERYDAY.</span>
            </div>
            <div className="store-shelf">
              <div className="bottle">
                <span>
                  moriveda
                  <br />
                  <small>BOTANICAL CARE</small>
                </span>
              </div>
              <div className="store-copy">
                A little closer
                <br />
                to nature.<span>Thoughtfully made. Naturally yours.</span>
                <b>Explore the collection ↗</b>
              </div>
              <ShoppingBag className="store-bag" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
