import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="font-serif text-6xl font-bold text-orange-600">404</p>
      <h1 className="mt-3 text-xl font-bold">ရှာတဲ့စာမျက်နှာ မတွေ့ပါ</h1>
      <Link to="/" className="btn-primary mt-6">Home သို့ ပြန်သွားမယ်</Link>
    </div>
  );
}
