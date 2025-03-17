'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import emailjs from '@emailjs/browser'
import { Gift, TrendingUp, Users } from "lucide-react"
import { useState } from "react"

// EmailJS 초기화
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)

interface CalculatorValues {
  initialPrice: string;
  quantity: string;
  currentPrice: string;
  targetPrice: string;
}

interface CalculationResult {
  averagePrice: number;
  additionalInvestment: number;
  expectedReturn: number;
}

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function LandingPage() {
  const [values, setValues] = useState<CalculatorValues>({
    initialPrice: '',
    quantity: '',
    currentPrice: '',
    targetPrice: ''
  });

  const [result, setResult] = useState<CalculationResult>({
    averagePrice: 0,
    additionalInvestment: 0,
    expectedReturn: 0
  });

  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setValues(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const calculateResults = () => {
    const initial = Number(values.initialPrice);
    const qty = Number(values.quantity);
    const current = Number(values.currentPrice);
    const target = Number(values.targetPrice);

    if (!initial || !qty || !current || !target) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    const averagePrice = (initial + current) / 2;
    const additionalInvestment = (current * qty) - (initial * qty);
    const expectedReturn = ((target - averagePrice) / averagePrice) * 100;

    setResult({
      averagePrice,
      additionalInvestment,
      expectedReturn
    });
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      alert('상담 신청이 성공적으로 전송되었습니다.');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      alert('상담 신청 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            선물 옵션 물타기 전략
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            안전하고 효율적인 선물 옵션 물타기로 수익을 극대화하세요
          </p>
          <div className="mt-10">
            <Button 
              size="lg"
              onClick={() => {
                const element = document.querySelector('#contact-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              시작하기
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                수익 극대화
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                체계적인 물타기 전략으로 손실은 최소화하고 수익은 극대화합니다
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                맞춤형 전략
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                개인의 투자 성향과 자금력에 맞는 최적의 물타기 전략을 제시합니다
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                전문가 지원
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                경험 많은 전문가들의 실시간 자문으로 안전한 투자를 지원합니다
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calculator Section */}
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
                    <span className="font-semibold">{result.additionalInvestment.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>예상 수익률:</span>
                    <span className="font-semibold text-green-600">{result.expectedReturn.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            무료 상담 신청
          </h2>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="이름을 입력하세요"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={contactForm.email}
                onChange={handleContactChange}
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">문의 내용</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="문의하실 내용을 입력하세요"
                className="min-h-[150px]"
              />
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? '전송 중...' : '상담 신청하기'}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gray-900 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="mb-6">
            체계적인 물타기 전략으로 더 나은 투자 결과를 만들어보세요
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => {
              const element = document.querySelector('#contact-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            무료 상담 신청
          </Button>
        </div>
      </section>
    </div>
  );
}