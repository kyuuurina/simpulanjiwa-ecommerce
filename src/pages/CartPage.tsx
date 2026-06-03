import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart, WISH_CARD_PRICE } from "@/context/CartContext";
import { formatMYR } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WA_NUMBER = "601159546069";
const LAST_MINUTE_RATE = 0.15;
const PICKUP_LOCATIONS = ["Rekascape, Cyberjaya", "Cybersouth, Dengkil"] as const;
type PickupLocation = typeof PICKUP_LOCATIONS[number];
type FulfilmentType = "pickup" | "delivery";

interface DeliveryForm {
  name: string;
  phone: string;
  address: string;
  date: string;
  time: string;
}

function isLastMinute(date: string, time: string): boolean {
  if (!date || !time) return false;
  const chosen = new Date(`${date}T${time}`);
  const diffHours = (chosen.getTime() - Date.now()) / 36e5;
  return diffHours >= 2 && diffHours <= 24;
}

function buildWhatsAppMessage(
  items: ReturnType<typeof useCart>["items"],
  subtotal: number,
  surcharge: number,
  total: number,
  fulfilment: FulfilmentType,
  pickupLocation: PickupLocation,
  form: DeliveryForm
) {
  const lines: string[] = [];

  lines.push("🌸 *New Order – Simpulan Jiwa*");
  lines.push("");
  lines.push("*Order Details:*");

  items.forEach((item, i) => {
    const unitPrice = item.product.sizePrices[item.size] + (item.wishCard ? WISH_CARD_PRICE : 0);
    lines.push(`${i + 1}. ${item.product.name}`);
    lines.push(`   Size: ${item.size} | Qty: ${item.quantity} | ${formatMYR(unitPrice)} each`);
    if (item.wishCard && item.wishMessage) {
      lines.push(`   📝 Wish card: "${item.wishMessage}"`);
    }
  });

  lines.push("");
  lines.push(`Subtotal: ${formatMYR(subtotal)}`);
  if (surcharge > 0) {
    lines.push(`Last-minute charge (15%): +${formatMYR(surcharge)}`);
  }
  lines.push(`*Total: ${formatMYR(total)}*`);
  lines.push("");

  if (fulfilment === "pickup") {
    lines.push("*Fulfilment: Self Pick-up*");
    lines.push(`Pick-up location: ${pickupLocation}`);
    lines.push(`Pick-up date: ${form.date}`);
    lines.push(`Pick-up time: ${form.time}`);
  } else {
    lines.push("*Fulfilment: Delivery*");
    lines.push(`Name: ${form.name}`);
    lines.push(`Phone: ${form.phone}`);
    lines.push(`Address: ${form.address}`);
    lines.push(`Delivery date: ${form.date}`);
    lines.push(`Delivery time: ${form.time}`);
  }

  lines.push("");
  lines.push("Please confirm availability. Thank you! 🌷");

  return lines.join("\n");
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const [fulfilment, setFulfilment] = useState<FulfilmentType>("pickup");
  const [pickupLocation, setPickupLocation] = useState<PickupLocation>(PICKUP_LOCATIONS[0]);
  const [form, setForm] = useState<DeliveryForm>({ name: "", phone: "", address: "", date: "", time: "" });

  const lastMinute = isLastMinute(form.date, form.time);
  const surcharge = lastMinute ? subtotal * LAST_MINUTE_RATE : 0;
  const total = subtotal + surcharge;

  function handleField(field: keyof DeliveryForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleWhatsAppOrder() {
    if (!form.date || !form.time) {
      toast.error(fulfilment === "pickup" ? "Please select a pick-up date and time." : "Please select a delivery date and time.");
      return;
    }
    if (fulfilment === "delivery") {
      if (!form.name.trim()) { toast.error("Please enter your name."); return; }
      if (!form.phone.trim()) { toast.error("Please enter your phone number."); return; }
      if (!form.address.trim()) { toast.error("Please enter your delivery address."); return; }
    }
    const message = buildWhatsAppMessage(items, subtotal, surcharge, total, fulfilment, pickupLocation, form);
    const encoded = encodeURIComponent(message);
    window.open(
      `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${encoded}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-fade-in">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h1 className="font-display text-3xl mb-3">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 text-sm">
          Looks like you haven't added any bouquets yet.
        </p>
        <Button asChild><Link to="/shop">Browse Bouquets</Link></Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <h1 className="section-heading">Your Cart</h1>
        <button
          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
          onClick={clearCart}
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Line items + fulfilment form */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const { product, quantity, size, wishCard, wishMessage } = item;
            const unitPrice = product.sizePrices[size] + (wishCard ? WISH_CARD_PRICE : 0);
            return (
              <div
                key={`${product.id}__${size}`}
                className="flex gap-4 bg-card border border-border rounded-xl p-4"
              >
                <Link to={`/products/${product.slug}`} className="shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${product.slug}`}
                    className="font-display text-base font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {product.name}
                  </Link>

                  <div className="flex flex-wrap gap-2 mt-1 mb-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                      Size {size} · {formatMYR(product.sizePrices[size])}
                    </span>
                    {wishCard && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                        Wish card +RM1
                      </span>
                    )}
                  </div>

                  {wishCard && wishMessage && (
                    <p className="text-xs text-muted-foreground italic mb-2 line-clamp-2">
                      "{wishMessage}"
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        className="px-2 py-1 hover:bg-muted transition-colors disabled:opacity-40"
                        onClick={() => updateQuantity(product.id, size, quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                      <button
                        className="px-2 py-1 hover:bg-muted transition-colors"
                        onClick={() => updateQuantity(product.id, size, quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-sm text-primary">
                        {formatMYR(unitPrice * quantity)}
                      </p>
                      <button
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => removeItem(product.id, size)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Fulfilment section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Fulfilment</h2>

            {/* Toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden mb-5">
              {(["pickup", "delivery"] as FulfilmentType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setFulfilment(type)}
                  className={cn(
                    "flex-1 py-2.5 text-sm font-medium transition-colors",
                    fulfilment === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground hover:text-foreground"
                  )}
                >
                  {type === "pickup" ? "Self Pick-up" : "Delivery"}
                </button>
              ))}
            </div>

            {fulfilment === "pickup" ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Pick-up Location</p>
                  <div className="flex flex-col gap-2">
                    {PICKUP_LOCATIONS.map((loc) => (
                      <label key={loc} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="pickupLocation"
                          value={loc}
                          checked={pickupLocation === loc}
                          onChange={() => setPickupLocation(loc)}
                          className="accent-[#5C1D20]"
                        />
                        <span className="text-sm text-foreground">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Pick-up Date *</label>
                    <Input type="date" value={form.date} onChange={(e) => handleField("date", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Pick-up Time *</label>
                    <Input type="time" value={form.time} onChange={(e) => handleField("time", e.target.value)} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Full Name *</label>
                  <Input placeholder="Your name" value={form.name} onChange={(e) => handleField("name", e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Phone Number *</label>
                  <Input placeholder="e.g. 0123456789" value={form.phone} onChange={(e) => handleField("phone", e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1 block">Delivery Address *</label>
                  <Input placeholder="Full address" value={form.address} onChange={(e) => handleField("address", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Delivery Date *</label>
                    <Input type="date" value={form.date} onChange={(e) => handleField("date", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1 block">Delivery Time *</label>
                    <Input type="time" value={form.time} onChange={(e) => handleField("time", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {lastMinute && (
              <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
                A <strong>15% last-minute charge</strong> applies as the selected time is within 2–24 hours from now.
              </div>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
            <h2 className="font-display text-lg font-semibold text-foreground mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm mb-5">
              {items.map((item) => {
                const unitPrice = item.product.sizePrices[item.size] + (item.wishCard ? WISH_CARD_PRICE : 0);
                return (
                  <div key={`${item.product.id}__${item.size}`} className="flex justify-between text-muted-foreground">
                    <span className="line-clamp-1 flex-1 pr-2">
                      {item.product.name} <span className="text-xs">({item.size}) ×{item.quantity}</span>
                    </span>
                    <span className="shrink-0">{formatMYR(unitPrice * item.quantity)}</span>
                  </div>
                );
              })}

              <div className="border-t border-border pt-3 flex justify-between text-foreground text-sm">
                <span>Subtotal</span>
                <span>{formatMYR(subtotal)}</span>
              </div>

              {lastMinute && (
                <div className="flex justify-between text-amber-700 text-sm">
                  <span>Last-minute charge (15%)</span>
                  <span>+{formatMYR(surcharge)}</span>
                </div>
              )}

              <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                <span>Total</span>
                <span className="text-primary">{formatMYR(total)}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white border-0"
              onClick={handleWhatsAppOrder}
            >
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </Button>

            <Link
              to="/shop"
              className="block text-center text-xs text-muted-foreground hover:text-primary mt-4 transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
