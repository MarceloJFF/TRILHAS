

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

function validacaoInputsVazio(input, feedback, isValid) {
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

function getRadioLabelText(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  if (selected) {
    const label = document.querySelector(`label[for="${selected.id}"] > span`);
    return label?.innerText || '';
  }
  return '';
}



function preencherEndereco() {
    let inputCep = document.querySelector(".step-1-cep");
    inputCep.addEventListener("input", async () => {
        const cep = inputCep.value.replace(/\D/g, ""); // remove qualquer caractere não numérico
        if (cep.length >= 8) {
            try {
                const endereco = await mostrarEndereco(cep);
                const uf = document.querySelector(".step-1-uf")
                const cidade = document.querySelector(".step-1-cidade")
                const bairro = document.querySelector(".step-1-bairro");
                const logradouro = document.querySelector(".step-1-logradouro");
                uf.value = endereco.uf;
                cidade.value = endereco.localidade;
                bairro.value = endereco.bairro;
                logradouro.value = endereco.logradouro;
                // Aqui você pode preencher outros campos, exemplo:
                // document.querySelector("#logradouro").value = endereco.logradouro;
            } catch (error) {
                console.error("Erro ao buscar endereço:", error);
            }
        }
    });
}


async function mostrarEndereco(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error("CEP não encontrado");
    }

    const data = await response.json();

    if (data.erro) {
        throw new Error("CEP inválido");
    }

    return data;
}
document.addEventListener("DOMContentLoaded", function () {
    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const indicators = document.querySelectorAll(".indicator");
    preencherEndereco();



    function validacaoInputsVazio(input, feedback, isValid) {
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

    function getRadioLabelText(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        if (selected) {
            const label = document.querySelector(`label[for="${selected.id}"] > span`);
            return label?.innerText || '';
        }
        return '';
    }


    document.addEventListener("DOMContentLoaded", function () {
        let currentStep = 1;
        const steps = document.querySelectorAll(".step");
        const indicators = document.querySelectorAll(".indicator");
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
                if (!ValidadeAllInputsFromStep(currentStep, event.currentTarget)) {
                    return; // Se houver erro, interrompe o avanço
                }
          
                if (button.classList.contains("form-full")) {
                    const inscrito = {
                        nome: document.querySelector(".step-1-nome").value,
                        cpf: document.querySelector(".step-1-cpf").value,
                        telefone: document.querySelector(".step-1-telefone").value,
                        sexo: getRadioLabelText("sexo"),
                        nascimento: document.querySelector(".step-1-nascimento").value,
                        cep: document.querySelector(".step-1-cep").value,
                        uf: document.querySelector(".step-1-uf").value,
                        cidade: document.querySelector(".step-1-cidade").value,
                        bairro: document.querySelector(".step-1-bairro").value,
                        idUsuario: document.querySelector(".step-1-id-usuario").value,
                        password: document.querySelector(".step-1-password").value,
                        confirmPassword: document.querySelector(".step-1-confirm-password").value,
                        logradouro: document.querySelector(".step-1-logradouro").value,
                        email: document.querySelector(".step-1-email").value,
                        instituicao: document.querySelector(".step-2-instituicao").value,
                        escolaridadeSelecionada: document.querySelector(".step-2-escolaridade").options[document.querySelector(".step-2-escolaridade").selectedIndex].text,
                        experiencia: document.querySelector(".step-2-experiencia").options[document.querySelector(".step-2-experiencia").selectedIndex].text,
                        areaEscolaridade: document.querySelector(".step-2-area-escolaridade").value,
                        tipoInstituicao: getRadioLabelText("tipoInstituicao"),
                        disponibilidade: getRadioLabelText("disponibilidade"),
                        area: getRadioLabelText("area"),
                        fileCpf: document.querySelector(".step-3-files-cpf").files[0],
                        fileEscolaridade: document.querySelector(".step-3-files-escolaridade").files[0],
                        fileResidencia: document.querySelector(".step-3-files-residencia").files[0],
                        fileDeclaracoes: document.querySelector(".step-3-files-declaracoes").files[0],
                        boxAceite: document.querySelector(".step-4-aceite").checked,
                    };
                    let inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];
                    inscritos.push(inscrito);
                    // Salva novamente no localStorage
                    localStorage.setItem("inscritos", JSON.stringify(inscritos));

                    Swal.fire({
                        title: "Inscrição realizada com sucesso!",
                        text: "Agora é só aguardar, já pode fechar esta janela",
                        icon: "success"
                    });
                }
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                }
                window.location.href = 'login.html';

            });
        });
   
        let ValidadeAllInputsFromStep = (currentStep, btn) => {
            let isValid = true;
            if (btn.classList.contains("step1")) {
                const inputs = document.querySelectorAll(".step-1-cpf,.step-1-nome,.step-1-telefone, .step-1-nascimento, .step-1-cep, .step-1-uf, .step-1-cidade, .step-1-bairro, .step-1-email, .step-1-password, .step-1-confirm-password, .step-1-id-usuario");
                isValid = validarRadio("sexo") && isValid;
            
                inputs.forEach(input => {
                    const feedback = input.nextElementSibling; // Pega a div de feedback logo após o input
                    isValid = validacaoInputsVazio(input, feedback, isValid);
                    //validações especificas
                    if (input.classList.contains("step-1-cpf")) {
                        const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
                        if (!cpfRegex.test(input.value)) {
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
                        } else if (confirmSenhaInput.value != "") {
                            input.classList.remove("is-invalid");
                            input.classList.add("is-valid");
                            if (feedback) feedback.textContent = "";
                        }
                    }


                });
                return isValid;
            }
            else if (btn.classList.contains("step2")) {
                const inputs = document.querySelectorAll(".step-2-instituicao, .form-select");
                isValid = validarRadio("tipoInstituicao") && isValid;
                isValid = validarRadio("disponibilidade") && isValid;
                isValid = validarRadio("area") && isValid;
                inputs.forEach((input) => {
                    const feedback = input.nextElementSibling; // Pega a div de feedback logo após o input
                    isValid = validacaoInputsVazio(input, feedback, isValid);
                })
                return isValid;
            } else if (btn.classList.contains("step3")) {
                const inputs = document.querySelectorAll(".step-3-files-cpf, .step-3-files-escolaridade, .step-3-files-residencia, .step-3-files-declaracoes");


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
    })
})
