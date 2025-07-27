import React, { useState, useEffect } from 'react';
// For charts, you would need a library like Recharts.
// To install: npm install recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// --- Helper SVG Icons ---
const LogoutIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const DashboardIcon = () => <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const OrdersIcon = () => <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const InventoryIcon = () => <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>;
const ProfileIcon = () => <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const AnalyticsIcon = () => <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
const RefreshIcon = () => <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M20 4s-1.5-2-4-2-4 2-4 2M4 20s1.5 2 4 2 4-2 4-2" /></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

// --- Reusable Dashboard Components ---
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
        <div className={`text-3xl p-3 rounded-full mr-4 ${color}`}>{icon}</div>
        <div>
            <p className="text-sm font-medium text-[#6e665f]">{title}</p>
            <p className="text-2xl font-bold text-[#44332d]">{value}</p>
        </div>
    </div>
);

// --- Functional Feature Panes ---
const DashboardPane = ({ orders }) => {
    const newOrdersCount = orders.filter(o => o.status === 'New').length;
    const readyOrdersCount = orders.filter(o => o.status === 'Ready for Pickup').length;
    const weeklySales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const recentOrders = orders.slice(0, 5);

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#44332d] mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="New Orders Today" value={newOrdersCount} icon="📦" color="bg-blue-100 text-blue-600" />
                <StatCard title="Ready for Pickup" value={readyOrdersCount} icon="🚚" color="bg-yellow-100 text-yellow-600" />
                <StatCard title="Total Sales This Week" value={`₹ ${weeklySales.toFixed(2)}`} icon="💰" color="bg-green-100 text-green-600" />
            </div>
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-[#44332d] mb-4">Recent Orders</h3>
                <div className="space-y-4">
                    {recentOrders.length > 0 ? (
                        recentOrders.map(order => (
                            <div key={order._id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-semibold text-[#44332d]">Order #{order._id.slice(-6)}</p>
                                    <p className="text-sm text-[#6e665f]">{order.items.length} items</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#44332d]">₹{order.totalAmount.toFixed(2)}</p>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${order.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>{order.status}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-[#6e665f]">You have no new orders.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const OrdersPane = ({ orders, setOrders, refreshOrders, isLoading }) => {
    const API_URL = 'https://rendor-saathi-backend.onrender.com/api';

    const handleUpdateStatus = async (orderId, status) => {
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const updatedOrder = await response.json();
            if (!response.ok) throw new Error("Failed to update status");
            setOrders(prevOrders => prevOrders.map(o => o._id === orderId ? updatedOrder : o));
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    };

    const OrderCard = ({ order }) => (
        <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold">Order ID: #{order._id.slice(-6)}</p>
            <p className="text-sm text-gray-600">Total: ₹{order.totalAmount.toFixed(2)}</p>
            {order.status === 'New' && (
                <button onClick={() => handleUpdateStatus(order._id, 'Accepted')} className="mt-2 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">Accept Order</button>
            )}
             {order.status === 'Accepted' && (
                <button onClick={() => handleUpdateStatus(order._id, 'Ready for Pickup')} className="mt-2 w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-600">Mark as Ready</button>
            )}
        </div>
    );

    const ordersByStatus = (status) => orders.filter(o => o.status === status);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#44332d]">Order Management</h2>
                <button onClick={refreshOrders} disabled={isLoading} className="flex items-center bg-white text-[#44332d] font-bold py-2 px-4 rounded-lg hover:bg-gray-100 border transition-all disabled:opacity-50">
                    <RefreshIcon />
                    {isLoading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['New', 'Accepted', 'Ready for Pickup', 'Completed'].map(status => (
                    <div key={status} className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-bold text-center mb-4">{status} ({ordersByStatus(status).length})</h3>
                        <div className="space-y-4">
                            {ordersByStatus(status).map(order => <OrderCard key={order._id} order={order} />)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const InventoryPane = ({ products, setProducts, supplierId }) => {
    const [newItem, setNewItem] = useState({ name: '', price: '', unit: 'kg' });
    const [error, setError] = useState('');
    const API_URL = 'http://192.168.1.10:5000/api';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        setError('');
        const productData = { ...newItem, supplierId, price: parseFloat(newItem.price) };
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            const savedProduct = await response.json();
            if (!response.ok) {
                throw new Error(savedProduct.message || "Failed to add product.");
            }
            setProducts(prev => [...prev, savedProduct]);
            setNewItem({ name: '', price: '', unit: 'kg' });
        } catch (error) {
            console.error("Failed to add product", error);
            setError(error.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#44332d] mb-6">Inventory Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold text-[#44332d] mb-4">Add New Item</h3>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <input name="name" value={newItem.name} onChange={handleInputChange} placeholder="Item Name (e.g., Onions)" required className="w-full px-4 py-2 border rounded-lg" />
                            <input name="price" type="number" value={newItem.price} onChange={handleInputChange} placeholder="Price (₹)" required className="w-full px-4 py-2 border rounded-lg" />
                            <select name="unit" value={newItem.unit} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg">
                                <option value="kg">per Kg</option>
                                <option value="litre">per Litre</option>
                                <option value="dozen">per Dozen</option>
                                <option value="piece">per Piece</option>
                            </select>
                            <button type="submit" className="w-full bg-[#c96a43] text-white font-bold py-3 rounded-lg">Add to Inventory</button>
                        </form>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                     <h3 className="text-xl font-bold text-[#44332d] mb-4">Your Products</h3>
                     <div className="space-y-2">
                        {products.map(p => (
                            <div key={p._id} className="flex justify-between items-center p-2 border-b">
                                <span>{p.name}</span>
                                <span>₹{p.price} / {p.unit}</span>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

const ProfilePane = ({ user, setUser }) => {
    const [formData, setFormData] = useState(user);
    const [message, setMessage] = useState('');
    const API_URL = 'http://192.168.1.10:5000/api';

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/profile/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const updatedUser = await response.json();
            if (!response.ok) throw new Error("Failed to update profile");
            setUser(updatedUser);
            setMessage('✅ Profile updated successfully!');
        } catch (error) {
            setMessage('❌ Failed to update profile.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#44332d] mb-6">Business Profile</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="businessName" value={formData.businessName || ''} onChange={handleChange} placeholder="Business Name" className="w-full px-4 py-2 border rounded-lg" />
                    <input name="area" value={formData.area || ''} onChange={handleChange} placeholder="Area" className="w-full px-4 py-2 border rounded-lg" />
                    <input name="warehouseAddress" value={formData.warehouseAddress || ''} onChange={handleChange} placeholder="Warehouse Address" className="w-full px-4 py-2 border rounded-lg" />
                    <button type="submit" className="w-full bg-[#c96a43] text-white font-bold py-3 rounded-lg">Save Changes</button>
                </form>
                {message && <p className="text-center mt-4">{message}</p>}
            </div>
        </div>
    );
};

const AnalyticsPane = ({ orders, products, user, setUser }) => {
    const [topProducts, setTopProducts] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [featured, setFeatured] = useState(user.featuredProductIds || []);
    const [message, setMessage] = useState('');
    const API_URL = 'http://192.168.1.10:5000/api';

    useEffect(() => {
        const productCounts = orders.flatMap(o => o.items).reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity;
            return acc;
        }, {});
        const sortedProducts = Object.entries(productCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, quantity]) => ({ name, quantity }));
        setTopProducts(sortedProducts);

        const salesByDay = orders.reduce((acc, order) => {
            const date = new Date(order.createdAt).toLocaleDateString();
            acc[date] = (acc[date] || 0) + order.totalAmount;
            return acc;
        }, {});
        const chartData = Object.entries(salesByDay).map(([name, sales]) => ({ name, sales }));
        setSalesData(chartData);

    }, [orders]);

    const handleFeatureToggle = (productId) => {
        setFeatured(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            }
            if (prev.length < 3) {
                return [...prev, productId];
            }
            return prev;
        });
    };

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`${API_URL}/profile/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ featuredProductIds: featured }),
            });
            const updatedUser = await response.json();
            if (!response.ok) throw new Error("Failed to update featured products");
            setUser(updatedUser);
            setMessage('✅ Featured products updated successfully!');
        } catch (error) {
            setMessage('❌ Failed to update.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#44332d] mb-6">Analytics & Reports</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                <h3 className="text-xl font-bold text-[#44332d] mb-4">Weekly Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#c96a43" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-[#44332d] mb-4">Top Selling Products (by Quantity)</h3>
                    <div className="space-y-2">
                        {topProducts.map(p => (
                            <div key={p.name} className="flex justify-between p-2 border-b">
                                <span>{p.name}</span>
                                <span className="font-bold">{p.quantity} sold</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-[#44332d] mb-4">Manage Featured Products (Max 3)</h3>
                    <div className="space-y-2">
                        {products.map(p => (
                            <label key={p._id} className="flex items-center space-x-3">
                                <input type="checkbox"
                                    checked={featured.includes(p._id)}
                                    onChange={() => handleFeatureToggle(p._id)}
                                    disabled={!featured.includes(p._id) && featured.length >= 3}
                                    className="h-5 w-5 rounded text-[#c96a43] focus:ring-[#a35835]"
                                />
                                <span>{p.name}</span>
                            </label>
                        ))}
                    </div>
                    <button onClick={handleSaveChanges} className="w-full mt-4 bg-[#c96a43] text-white font-bold py-2 rounded-lg">Save Featured Items</button>
                    {message && <p className="text-center text-sm mt-2">{message}</p>}
                </div>
            </div>
        </div>
    );
};


// --- Main Supplier Dashboard Component ---
export default function SupplierDashboard({ user, onLogout }) {
    const [activeView, setActiveView] = useState('dashboard');
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [currentUser, setCurrentUser] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [ordersRes, productsRes] = await Promise.all([
                fetch(`http://192.168.1.10:5000/api/orders/supplier/${user.id}`),
                fetch(`http://192.168.1.10:5000/api/products/supplier/${user.id}`)
            ]);
            const ordersData = await ordersRes.json();
            const productsData = await productsRes.json();
            setOrders(ordersData);
            setProducts(productsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user.id]);


    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardPane orders={orders} />;
            case 'orders': return <OrdersPane orders={orders} setOrders={setOrders} refreshOrders={fetchData} isLoading={isLoading} />;
            case 'inventory': return <InventoryPane products={products} setProducts={setProducts} supplierId={user.id} />;
            case 'profile': return <ProfilePane user={currentUser} setUser={setCurrentUser} />;
            case 'analytics': return <AnalyticsPane orders={orders} products={products} user={currentUser} setUser={setCurrentUser} />;
            default: return <DashboardPane orders={orders} />;
        }
    };

    const NavItem = ({ view, icon, label }) => ( <button onClick={() => { setActiveView(view); setIsMobileMenuOpen(false); }} className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-colors ${activeView === view ? 'bg-[#c96a43] text-white' : 'text-[#6e665f] hover:bg-[#d2c5b8]'}`}> {icon} <span className="font-medium">{label}</span> </button> );

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="text-2xl font-bold text-[#44332d] mb-8">
                Supplier <span className="text-[#c96a43]">Portal</span>
            </div>
            <nav className="space-y-2">
                <NavItem view="dashboard" icon={<DashboardIcon />} label="Dashboard" />
                <NavItem view="orders" icon={<OrdersIcon />} label="Orders" />
                <NavItem view="inventory" icon={<InventoryIcon />} label="Inventory" />
                <NavItem view="profile" icon={<ProfileIcon />} label="Profile" />
                <NavItem view="analytics" icon={<AnalyticsIcon />} label="Analytics" />
            </nav>
            <div className="mt-auto">
                <button onClick={onLogout} className="flex items-center w-full text-left px-4 py-3 rounded-lg text-[#6e665f] hover:bg-red-100 hover:text-red-600 transition-colors">
                    <LogoutIcon />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f9f4ef] flex">
            <aside className="w-64 bg-white p-6 shadow-lg hidden md:flex flex-col">
                <SidebarContent />
            </aside>
            <div className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}></div>
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-lg z-40 transform transition-transform md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarContent />
            </aside>
            <div className="flex-1">
                <header className="bg-white shadow-sm md:hidden p-4 flex justify-between items-center">
                     <div className="text-xl font-bold text-[#44332d]">Supplier Portal</div>
                     <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
                        <MenuIcon />
                     </button>
                </header>
                <main className="p-6 md:p-10">
                    {renderView()}
                </main>
            </div>
        </div>
    );
}
