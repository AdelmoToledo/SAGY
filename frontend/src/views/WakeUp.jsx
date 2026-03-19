import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const WakeUp = ({ onReady }) => {
    const [segundos, setSegundos] = useState(60);
    const [status, setStatus] = useState('idle'); // 'idle', 'counting', 'checking', 'error'

    useEffect(() => {
        let timer;
        if (status === 'counting' && segundos > 0) {
            timer = setInterval(() => {
                setSegundos((prev) => prev - 1);
            }, 1000);
        } else if (segundos === 0 && status === 'counting') {
            verificarConexao();
        }
        return () => clearInterval(timer);
    }, [status, segundos]);

    const iniciarProcesso = () => {
        setStatus('counting');
        // "Cutuca" o Render para ele começar a ligar o motor
        fetch('http://sagy.onrender.com/').catch(() => {});
    };

    const verificarConexao = async () => {
        setStatus('checking');
        try {
            // Testa se o servidor responde em até 10 segundos
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const res = await fetch('http://sagy.onrender.com/', {
                signal: controller.signal
            });

            if (res.ok) {
                onReady(); // Libera o App.jsx para mostrar as rotas de Login/Dashboard
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--primary-soft))]">

             <Card className="w-[360px] bg-white shadow-md rounded-2xl border-0">

                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-[hsl(var(--primary))]">
                        SAGY VEST
                    </CardTitle>

                    <CardContent className="space-y-6 mt-2">
                         
                        <p className="text-center text-gray-500 mb-8 text-sm uppercase font-bold tracking-widest">Sistema de Gestão</p>
                         
                        {status === 'idle' && (
                            <Button 
                                onClick={iniciarProcesso}
                                className="w-full bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary-dark))] text-white"
                            >
                                ACORDAR SERVIDOR
                            </Button>

                            
                        )}

                        {status === 'counting' && (
                            <div className="space-y-4">
                                <div className="text-pink-600 text-center font-black text-4xl animate-pulse">
                                    {segundos}s
                                </div>
                                <p className="text-gray-600 text-sm font-medium">
                                    ⚙️ Aquecendo motores do Render...
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-pink-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${(60 - segundos) * 1.66}%` }}></div>
                                </div>
                            </div>
                        )}

                        {status === 'checking' && (
                            <div className="flex flex-col items-center space-y-3">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-600"></div>
                                <p className="text-pink-600 font-bold">VALIDANDO CONEXÃO...</p>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="space-y-4">
                                <p className="text-red-500 text-center font-bold">O servidor ainda não respondeu.</p>
                                <Button 
                                    onClick={() => { setSegundos(60); setStatus('idle'); }}
                                    className="w-full bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary-dark))] text-white"
                                >
                                    TENTAR NOVAMENTE
                                </Button>
                            </div>
                        )}                          
                    </CardContent>

                </CardHeader>
            </Card>  
            
        </div>
    );
};

export default WakeUp;
