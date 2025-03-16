'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import emailjs from '@emailjs/browser';

// ... existing code ...

const handleSubmit = async () => {
  if (!contactForm.name || !contactForm.email || !contactForm.message) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  setIsSubmitting(true);
  try {
    await emailjs.send(
      'service_xxxxxxx', // EmailJS Service ID
      'template_xxxxxxx', // EmailJS Template ID
      {
        from_name: contactForm.name,
        from_email: contactForm.email,
        message: contactForm.message,
        to_email: 'sijm@naver.com',
      },
      'xxxxxxxxxxxxx' // EmailJS Public Key
    );
    alert('문의가 성공적으로 전송되었습니다.');
    setContactForm({ name: '', email: '', message: '' });
  } catch (error) {
    console.error('Email send error:', error);
    alert('문의 전송에 실패했습니다. 다시 시도해주세요.');
  } finally {
    setIsSubmitting(false);
  }
};

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface CalculationResult {
  averagePrice: number
  additionalAmount: number
  expectedReturn: number
  recommendedQuantity: number
  totalInvestment: number
}

export default function LandingPage() {
  const [values, setValues] = useState({
    initialPrice: 50000,
    quantity: 10,
    currentPrice: 45000,
    targetPrice: 48000
  })

  const [result, setResult] = useState<CalculationResult>({
    averagePrice: 47500,
    additionalAmount: 450000,
    expectedReturn: 1.05,
    recommendedQuantity: 10,
    totalInvestment: 950000
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setValues(prev => ({
      ...prev,
      [id]: Number(value)
    }))
  }
// ... inside your component, with other useState declarations ...
const [contactForm, setContactForm] = useState<ContactForm>({
  name: '',
  email: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateResults = () => {
    const { initialPrice, quantity, currentPrice, targetPrice } = values
    
    const recommendedQuantity = Math.round(quantity * (initialPrice / currentPrice))
    
    const initialInvestment = initialPrice * quantity
    const additionalAmount = currentPrice * recommendedQuantity
    const totalInvestment = initialInvestment + additionalAmount
    
    const totalQuantity = quantity + recommendedQuantity
    const averagePrice = totalInvestment / totalQuantity
    
    const expectedReturn = ((targetPrice - averagePrice) / averagePrice) * 100

    setResult({
      averagePrice: Math.round(averagePrice),
      additionalAmount: Math.round(additionalAmount),
      expectedReturn: Number(expectedReturn.toFixed(2)),
      recommendedQuantity,
      totalInvestment: Math.round(totalInvestment)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            선물 옵션 물타기 전략
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            안전하고 효율적인 선물 옵션 물타기로 수익을 극대화하세요
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 bg-gray-50 rounded-xl">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            물타기 계산기
          </h2>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="initialPrice">최초 매수가</Label>
              <Input
                id="initialPrice"
                type="number"
                value={values.initialPrice}
                onChange={handleInputChange}
                placeholder="최초 매수 가격을 입력하세요"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="quantity">수량</Label>
              <Input
                id="quantity"
                type="number"
                value={values.quantity}
                onChange={handleInputChange}
                placeholder="매수 수량을 입력하세요"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="currentPrice">현재가</Label>
              <Input
                id="currentPrice"
                type="number"
                value={values.currentPrice}
                onChange={handleInputChange}
                placeholder="현재 가격을 입력하세요"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="targetPrice">목표가</Label>
              <Input
                id="targetPrice"
                type="number"
                value={values.targetPrice}
                onChange={handleInputChange}
                placeholder="목표 가격을 입력하세요"
              />
            </div>

            <Button className="w-full" size="lg" onClick={calculateResults}>
              계산하기
            </Button>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>계산 결과</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>평균 매수가:</span>
                    <span className="font-semibold">{result.averagePrice.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>필요 추가 매수금액:</span>
                    <span className="font-semibold">{result.additionalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 수익률:</span>
                    <span className={`font-semibold ${result.expectedReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {result.expectedReturn >= 0 ? '+' : ''}{result.expectedReturn}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>추천 물타기 수량:</span>
                    <span className="font-semibold">{result.recommendedQuantity}주</span>
                  </div>
                  <div className="flex justify-between">
                    <span>총 투자금액:</span>
                    <span className="font-semibold">{result.totalInvestment.toLocaleString()}원</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      // ... existing code ...

{/* Contact Section */}
<section className="container mx-auto px-4 py-16">
  <div className="max-w-2xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-8">
      이메일 문의
    </h2>
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          placeholder="이름을 입력하세요"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">문의 내용</Label>
        <Textarea
          id="message"
          placeholder="문의하실 내용을 입력하세요"
          className="min-h-[150px]"
        />
      </div>

      <Button className="w-full" size="lg">
        문의하기
      </Button>
    </div>
  </div>
</section>

{/* Footer */}
<footer className="container mx-auto px-4 py-8 mt-16 border-t">
  <div className="text-center text-gray-600">
    <p>© 2024 선물옵션 물타기 전략. All rights reserved.</p>
  </div>
</footer>
</div>
)
}