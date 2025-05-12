import MarketplacePanel from '../components/MarketplacePanel/MarketplacePanel';

export default function Home() {
    return (
        <div className="container">
            <h1>Admin panel</h1>

            <div className="tabs">
                <button className="tab active">Gateway</button>
                <button className="tab">Scraper</button>
                <button className="tab">Bot</button>
            </div>

            <div className="subtabs">
                <button className="subtab active">Маркетплейсы</button>
                <button className="subtab">Правила</button>
            </div>

            <MarketplacePanel></MarketplacePanel>
        </div>
    );
}
