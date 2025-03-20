document.addEventListener("DOMContentLoaded", function () {

            let currentStep = 1;
            const steps = document.querySelectorAll(".step");
            const indicators = document.querySelectorAll(".indicator");

                        
            function validarRadio(name) {
                const radios = document.querySelectorAll(`input[name="${name}"]`);
                const feedback = document.querySelector(`#feedback-${name}`);
                let selecionado = false;

                radios.forEach(radio => {
                    if (radio.checked) {
                        selecionado = true;
                    }
                });

                if (!selecionado) {
                    radios.forEach(radio => radio.classList.add("is-invalid"));
                    if (feedback) feedback.textContent = "Escolha uma opção.";
                    return false;
                } else {
                    radios.forEach(radio => radio.classList.remove("is-invalid"));
                    if (feedback) feedback.textContent = "";
                    return true;
                }
            }

            function showStep(step) {
                steps.forEach((s, index) => {
                    s.classList.toggle("d-none", index + 1 !== step);
                });
                indicators.forEach((i, index) => {
                    i.classList.toggle("active", index + 1 === step);
                });
            }

            document.querySelectorAll(".next").forEach(button => {
                button.addEventListener("click", function (event) {
                    if(button.classList.contains("form-full")){
                        window.alert("Formulário enviado com sucesso!");
                    }
                    event.preventDefault();
                if (!ValidadeAllInputsFromStep(currentStep, event.currentTarget)) {
                    return; // Se houver erro, interrompe o avanço
                }
                if (currentStep < steps.length) {
                        currentStep++;
                        showStep(currentStep);
                    }
                });

                
            });
            function validacaoInputsVazio(input, feedback, isValid) {
                        //validação geral
                        if (input.value.trim() == "") {
                            input.classList.add("is-invalid");
                            input.classList.remove("is-valid");
                            if (feedback) feedback.textContent = "Este campo é obrigatório.";
                            isValid = false;
                        } else {
                            input.classList.remove("is-invalid");
                            input.classList.add("is-valid");
                        }
                        return isValid;
            }
            let ValidadeAllInputsFromStep = (currentStep, btn) => {
                if (btn.classList.contains("step1")) {
                    const inputs = document.querySelectorAll(".step-1-cpf,.step-1-nome,.step-1-telefone, .step-1-nascimento, .step-1-cep, .step-1-uf, .step-1-cidade, .step-1-bairro, .step-1-email, .step-1-password, .step-1-confirm-password");
                    
                    let isValid = true;
                    console.log(inputs)
                    inputs.forEach(input => {
                        const feedback = input.nextElementSibling; // Pega a div de feedback logo após o input
                        isValid = validacaoInputsVazio(input,feedback,isValid);
                        isValid = validarRadio("sexo") && isValid;

                        //validações especificas
                        if (input.classList.contains("step-1-cpf")) {
                            const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
                            if (!cpfRegex.test(input.value) ) {
                                input.classList.add("is-invalid");
                                input.classList.remove("is-valid");
                                if (feedback) feedback.textContent = "CPF inválido. Digite um CPF válido.";
                                isValid = false;
                            } else {
                                input.classList.remove("is-invalid");
                                input.classList.add("is-valid");
                                if (feedback) feedback.textContent = "";
                            }
                        }

                        if (input.classList.contains("step-1-email")) {
                            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            
                            if (!emailRegex.test(input.value)) {
                                input.classList.add("is-invalid");
                                input.classList.remove("is-valid");
                                if (feedback) feedback.textContent = "E-mail inválido. Digite um e-mail válido.";
                                isValid = false;
                            } else {
                                input.classList.remove("is-invalid");
                                input.classList.add("is-valid");
                                if (feedback) feedback.textContent = "";
                            }
                        }

                        // Seleciona os inputs
                        const senhaInput = document.querySelector(".step-1-password");
                        const confirmSenhaInput = document.querySelector(".step-1-confirm-password");

                        if (input.classList.contains("step-1-telefone")) {
                            const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

                            if (!telefoneRegex.test(input.value)) {
                                input.classList.add("is-invalid");
                                input.classList.remove("is-valid");
                                if (feedback) feedback.textContent = "Número de telefone inválido. Digite DD+9XXXXXXXX";
                                isValid = false;
                            } else {
                                input.classList.remove("is-invalid");
                                input.classList.add("is-valid");
                                if (feedback) feedback.textContent = "";
                            }
                        }

                        if (input.classList.contains("step-1-confirm-password")) {
                            if (senhaInput.value !== confirmSenhaInput.value) {
                                input.classList.add("is-invalid");
                                input.classList.remove("is-valid");
                                if (feedback) feedback.textContent = "As senhas não coincidem.";
                                isValid = false;
                            } else if(confirmSenhaInput.value != ""){ 
                                input.classList.remove("is-invalid");
                                input.classList.add("is-valid");
                                if (feedback) feedback.textContent = "";
                            }
                        }


                    });

                    return isValid;
                }
                else if(btn.classList.contains("step2")){
                    const inputs = document.querySelectorAll(".step-2-instituicao, .form-select");
                    let isValid = true;
                    isValid = validarRadio("tipoInstituicao") && isValid;
                    isValid = validarRadio("disponibilidade") && isValid;
                    isValid = validarRadio("area") && isValid;
                    inputs.forEach((input)=>{
                        const feedback = input.nextElementSibling; // Pega a div de feedback logo após o input
                        isValid = validacaoInputsVazio(input,feedback,isValid);
                    })
                    return isValid;
                } else if (btn.classList.contains("step3")) {
                    const inputs = document.querySelectorAll(".step-3-files-cpf, .step-3-files-escolaridade, .step-3-files-residencia, .step-3-files-declaracoes");
                    let isValid = true;
                    inputs.forEach((input) => {
                        const feedback = input.nextElementSibling; // Pega a div de feedback logo após o input
                        if (input.files.length === 0) {
                            input.classList.add("is-invalid");
                            isValid = false;
                            feedback.textContent = "Por favor, selecione um arquivo.";
                        } else {
                            input.classList.remove("is-invalid");
                            input.classList.add("is-valid");
                            feedback.textContent = "";
                        }
                    })
                    return isValid;
                } else if (btn.classList.contains("step4")) {
                    const input = document.querySelector(".step-4-aceite");
                    const feedback = input.nextElementSibling; // Pega a div de feedback logo após o input
                    let isValid = true;
                    if (!input.checked) {
                        input.classList.add("is-invalid");
                        input.classList.remove("is-valid");
                        feedback.textContent = "Por favor, ACEITE OS TERMOS";

                        isValid = false;
                    } else {
                        input.classList.remove("is-invalid");
                        input.classList.add("is-valid");
                        feedback.textContent = "";

                    }
                    return isValid;
                    
                }
            }


            document.querySelectorAll(".prev").forEach(button => {
                button.addEventListener("click", function () {
                    if (currentStep > 1) {
                        currentStep--;
                        showStep(currentStep);
                    }
                });
            });
          

            showStep(currentStep);
        });