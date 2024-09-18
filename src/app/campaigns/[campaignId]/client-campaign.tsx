"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
  ResponseEvent,
  MiniAppPaymentPayload,
} from "@worldcoin/minikit-js";
import { CampaignWithCreator } from "@/lib/actions/campaign";

interface ClientSideCampaignProps {
  campaign: CampaignWithCreator;
  donationTier: {
    name: string;
    amount: number;
    perks: string[];
  };
}

export function ClientSideCampaign({
  campaign,
  donationTier,
}: ClientSideCampaignProps) {
  const [customAmount, setCustomAmount] = useState<string>("");

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      console.error("MiniKit is not installed");
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppPayment,
      async (response: MiniAppPaymentPayload) => {
        if (response.status == "success") {
          const res = await fetch(`/api/confirm-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const payment = await res.json();
          if (payment.success) {
            // Congrats your payment was successful!
          }
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppPayment);
    };
  }, []);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const sendPayment = async (amount: number, address: string) => {
    const res = await fetch("/api/initiate-payment", {
      method: "POST",
    });
    const { id } = await res.json();

    console.log("id", id, "address", address, "amount", amount);

    const payload: PayCommandInput = {
      reference: id,
      to: address,
      tokens: [
        {
          symbol: Tokens.WLD,
          token_amount: tokenToDecimals(amount, Tokens.WLD).toString(),
        },
      ],
      description: "Test example payment for minikit",
    };

    if (MiniKit.isInstalled()) {
      MiniKit.commands.pay(payload);
    }
  };

  return (
    <>
      {/* Donation Tiers */}
      <div className="space-y-6 mb-12">
        <h3 className="text-2xl font-bold text-center">
          Choose Your Support Level
        </h3>
        <Card key={donationTier.name}>
          <CardHeader>
            <CardTitle>{donationTier.name}</CardTitle>
            <CardDescription>
              {donationTier.amount} WLD donation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {donationTier.perks.map((perk, i) => (
                <li key={i}>{perk}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() =>
                sendPayment(donationTier.amount, campaign.paymentAddress)
              }
              className="w-full"
            >
              Donate {donationTier.amount} WLD
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Custom Donation */}
      <div className="text-center mb-12">
        <h3 className="text-xl font-semibold mb-4">Custom Donation</h3>
        <div className="flex flex-col justify-start items-start gap-4">
          <Label htmlFor="amount" className="text-right">
            Amount
          </Label>
          <Input
            id="amount"
            className="col-span-3"
            value={customAmount}
            onChange={handleCustomAmountChange}
            type="number"
            min="0"
            step="0.01"
          />
          <Button
            className="w-full"
            onClick={() =>
              sendPayment(parseFloat(customAmount), campaign.paymentAddress)
            }
            disabled={!customAmount || parseFloat(customAmount) <= 0}
          >
            Donate Now
          </Button>
        </div>
      </div>
    </>
  );
}
