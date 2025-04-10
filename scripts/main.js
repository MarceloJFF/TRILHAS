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
    if (input.value.trim() === "") {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        if (feedback) feedback.textContent = "Este campo é obrigatório.";
        isValid = false;
    } else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        if (feedback) feedback.textContent = "";
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

function preencherEndereco() {
    const inputCep = document.querySelector(".step-1-cep");
    inputCep.addEventListener("input", async () => {
        const cep = inputCep.value.replace(/\D/g, "");
        if (cep.length === 8) {
            try {
                const endereco = await mostrarEndereco(cep);
                document.querySelector(".step-1-uf").value = endereco.uf;
                document.querySelector(".step-1-cidade").value = endereco.localidade;
                document.querySelector(".step-1-bairro").value = endereco.bairro;
                document.querySelector(".step-1-logradouro").value = endereco.logradouro;
            } catch (error) {
                console.error("Erro ao buscar endereço:", error);
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const indicators = document.querySelectorAll(".indicator");

    preencherEndereco();

    function showStep(step) {
        steps.forEach((s, index) => s.classList.toggle("d-none", index + 1 !== step));
        indicators.forEach((i, index) => i.classList.toggle("active", index + 1 === step));
    }

    function validateAllInputsFromStep(currentStep, btn) {
        let isValid = true;

        if (btn.classList.contains("step1")) {
            const inputs = document.querySelectorAll(".step-1-cpf,.step-1-nome,.step-1-telefone, .step-1-nascimento, .step-1-cep, .step-1-uf, .step-1-cidade, .step-1-bairro, .step-1-email, .step-1-password, .step-1-confirm-password, .step-1-id-usuario");
            isValid = validarRadio("sexo") && isValid;

            inputs.forEach(input => {
                const feedback = input.nextElementSibling;
                isValid = validacaoInputsVazio(input, feedback, isValid);

                if (input.classList.contains("step-1-cpf")) {
                    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
                    if (!cpfRegex.test(input.value)) {
                        input.classList.add("is-invalid");
                        input.classList.remove("is-valid");
                        feedback.textContent = "CPF inválido.";
                        isValid = false;
                    }
                }

                if (input.classList.contains("step-1-email")) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add("is-invalid");
                        input.classList.remove("is-valid");
                        feedback.textContent = "E-mail inválido.";
                        isValid = false;
                    }
                }

                if (input.classList.contains("step-1-telefone")) {
                    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
                    if (!telefoneRegex.test(input.value)) {
                        input.classList.add("is-invalid");
                        input.classList.remove("is-valid");
                        feedback.textContent = "Telefone inválido.";
                        isValid = false;
                    }
                }

                if (input.classList.contains("step-1-confirm-password")) {
                    const senhaInput = document.querySelector(".step-1-password");
                    if (input.value !== senhaInput.value) {
                        input.classList.add("is-invalid");
                        feedback.textContent = "As senhas não coincidem.";
                        isValid = false;
                    }
                }
            });
        } else if (btn.classList.contains("step2")) {
            const inputs = document.querySelectorAll(".step-2-instituicao, .form-select");
            isValid = validarRadio("tipoInstituicao") && isValid;
            isValid = validarRadio("disponibilidade") && isValid;
            isValid = validarRadio("area") && isValid;

            inputs.forEach(input => {
                const feedback = input.nextElementSibling;
                isValid = validacaoInputsVazio(input, feedback, isValid);
            });
        } else if (btn.classList.contains("step3")) {
            const inputs = document.querySelectorAll(".step-3-files-cpf, .step-3-files-escolaridade, .step-3-files-residencia, .step-3-files-declaracoes");

            inputs.forEach(input => {
                const feedback = input.nextElementSibling;
                if (input.files.length === 0) {
                    input.classList.add("is-invalid");
                    feedback.textContent = "Por favor, selecione um arquivo.";
                    isValid = false;
                } else {
                    input.classList.remove("is-invalid");
                    input.classList.add("is-valid");
                    feedback.textContent = "";
                }
            });
        } else if (btn.classList.contains("step4")) {
            const input = document.querySelector(".step-4-aceite");
            const feedback = input.nextElementSibling;
            if (!input.checked) {
                input.classList.add("is-invalid");
                feedback.textContent = "Por favor, aceite os termos.";
                isValid = false;
            } else {
                input.classList.remove("is-invalid");
                feedback.textContent = "";
            }
        }

        return isValid;
    }

    document.querySelectorAll(".next").forEach(button => {
        button.addEventListener("click", event => {
            if (!validateAllInputsFromStep(currentStep, button)) return;

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
                    escolaridadeSelecionada: document.querySelector(".step-2-escolaridade").selectedOptions[0].text,
                    experiencia: document.querySelector(".step-2-experiencia").selectedOptions[0].text,
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

                const inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];
                inscritos.push(inscrito);
                localStorage.setItem("inscritos", JSON.stringify(inscritos));

                Swal.fire({
                    title: "Inscrição realizada com sucesso!",
                    text: "Agora é só aguardar. Você já pode fechar esta janela.",
                    icon: "success"
                });

                window.location.href = 'login.html';
                return;
            }

            if (currentStep < steps.length) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    document.querySelectorAll(".prev").forEach(button => {
        button.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    showStep(currentStep);
});
