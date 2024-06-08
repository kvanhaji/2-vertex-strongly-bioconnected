//توبة حسين تركمان
class Graph {
    constructor(vertices) {
        this.vertices = vertices;
        this.adjList = new Map();
        this.addedVertices = new Set();

        for (let i = 0; i < vertices; i++) {
            this.addedVertices.add(i);
            this.adjList.set(i, []);
        }
    }
//بوليانا موريس شريقي
    addEdge(v, w) {
        this.adjList.get(v).push(w);
    }

    SCCUtil(u, low, disc, stackMember, st) {
        staticTime += 1;
        disc[u] = low[u] = staticTime;
        st.push(u);
        stackMember[u] = true;

        for (let v of this.adjList.get(u)) {
            if (disc[v] == -1) {
                this.SCCUtil(v, low, disc, stackMember, st);
                low[u] = Math.min(low[u], low[v]);
            } else if (stackMember[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
//جيهان عز الدين عرب
        let w = 0;
        if (low[u] == disc[u]) {
            let component = [];
            while (st[st.length - 1] != u) {
                w = st.pop();
                component.push(w);
                stackMember[w] = false;
            }
            w = st.pop();
            component.push(w);
            stackMember[w] = false;
            components.push(component);
        }
    }
//كفان رشيد حاجي
    SCC() {
        let disc = new Array(this.vertices).fill(-1);
        let low = new Array(this.vertices).fill(-1);
        let stackMember = new Array(this.vertices).fill(false);
        let st = [];
// الحسن احمد مخلوف
        for (let i = 0; i < this.vertices; i++) {
            if (disc[i] == -1) {
                this.SCCUtil(i, low, disc, stackMember, st);
            }
        }
    }
//مجد صبحي الحاج تمر
    isStronglyConnected() {
        this.SCC();
        if (components.length == 1) return true;
        return false;
    }
//ميخائيل فتح الله استيفان
    is2VertexConnected() {
        for (let v of this.addedVertices) {
            let g = new Graph(this.vertices - 1);

            for (let u = 0; u < this.vertices; u++) {
                if (u == v) continue;

                for (let w of this.adjList.get(u)) {
                    if (w != v) g.addEdge(u < v ? u : u - 1, w < v ? w : w - 1);
                }
            }
//عبد العزيز ابراهيم محمد صادق
            components = [];
            staticTime = 0;

            if (!g.isStronglyConnected()) return false;
        }

        return true;
    }
}
//مايا غياث اسماعيل
let staticTime = 0;
let components = [];

let g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(2, 0);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(4, 1);
// فاطمة بشير العبدالله
if (g.isStronglyConnected() && g.is2VertexConnected()) {
    console.log("Graph is 2-vertex strongly biconnected.");
} else {
    console.log("Graph is not 2-vertex strongly biconnected.");
}
